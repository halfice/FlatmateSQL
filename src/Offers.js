import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import uploader from './uloaaderimage.gif'
import './sliding.css';
import axios from 'axios';
import imageCompression from 'browser-image-compression'
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome } from '@fortawesome/free-solid-svg-icons';
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lockz from './Locationsuggest';
library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)
export class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginUserID: this.props.UserID,
            OfferScreen: 0,


        }

        //screen 1 flat mate grid
        //screen 2 property grid





        this.hovermefdiv2 = this.hovermefdiv2.bind(this);
        this.removehovermefdiv2 = this.removehovermefdiv2.bind(this);

        this.hovermefdiv3 = this.hovermefdiv3.bind(this);
        this.removehovermefdiv3 = this.removehovermefdiv3.bind(this);
        this.hovermefdiv4 = this.hovermefdiv4.bind(this);
        this.removehovermefdiv4 = this.removehovermefdiv4.bind(this);
        this.handlearent = this.handlearent.bind(this);
        this.handlebond = this.handlebond.bind(this);
        this.handlebills = this.handlebills.bind(this);
        this.handlepropertyAddress = this.handlepropertyAddress.bind(this);
        this.handleprince = this.handleprince.bind(this);
   
        this.handleoffersscreenflatmate = this.handleoffersscreenflatmate.bind(this);
        this.handleoffersscreenproperty = this.handleoffersscreenproperty.bind(this);


   
    }

    componentDidMount() {
        this.getblobtoken();
    }

    async getblobtoken() {
        var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerStorageToken?code=TqfhfkL7Vgn0x/H7JHdqZQXTCzQZSMvAVcmKk2teC3ZOgTVSN3QYaA==";
        try {
            let res = await axios.post(loginurl);
            this.setState({
                blobtoken: res,
                loader: false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleprince(event) {
        this.setState({
            price: event.target.value,
        });
    }

    handleoffersscreenflatmate(event) {
        this.setState({
            OfferScreen: 1,
        });
    }
    
    handleoffersscreenproperty(event) {
        this.setState({
            OfferScreen: 2,
        });
    }

    async handleImageUpload(files) {
        if (files.target.files.length > 0) {
            const file = files.target.files[0];

            const filename = file.name.substring(0, file.name.lastIndexOf('.'));
            const ext = file.name.substring(file.name.lastIndexOf('.'));
            const blobName = filename + '_' + new Date().getTime() + ext;


            this.uploadFile(file, blobName);
            this.handleImageUploadold(file, blobName);
        }
    }


    uniqueNumber() {
        var date = Date.now();

        return date;
    }

    async uploadFile(file, blobName) {
        //    //https://userfunctionsapi.azurewebsites.net/?st=2020-11-04T18%3A49%3A22Z&se=2020-11-04T19%3A49%3A22Z&sp=W&sv=2018-03-28&sr=b&sig=2tbOll2oU1JdvkxLiHui%2BpRU6nHqsA0uKNtDF%2BsfZQU%3D

        const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
        const sas = this.state.blobtoken;
        var finalToken = sas.data.token;
        //finalToken="";
        //finalToken="?sv=2019-12-12&ss=bf&srt=s&sp=rwlac&se=2021-12-29T22:25:54Z&st=2020-11-28T14:25:54Z&spr=https&sig=F2JpyoUBdGW96gnefEsi3xZHA6J%2F7e2isHXz3p3G824%3D";

        const STORAGE_ACCOUNT_NAME = 'userfunctionsapi'
        const CONTAINER_NAME = 'myfiles'
        // for browser, SAS_TOKEN is get from API?
        const SAS_TOKEN = finalToken;
        const sasURL = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${SAS_TOKEN}`

        const blobServiceClient = new BlobServiceClient(sasURL)
        const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME)


        const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file)
        console.log(`Upload block blob ${file.name} successfully`, uploadBlobResponse.clientRequestId);

    }

    async handleImageUploadold(file, blobName) {
        this.setState({
            loader: true,
        });
        const imageFile = file;
        let reader = new FileReader();
        var newfile = imageFile;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
            usbd: 22,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);

            reader.onloadend = () => {
                var tmp = this.state.picscounter;
                tmp = tmp + 1;
                const data = {
                    picstring: reader.result,
                }
                if (tmp == 1) {
                    this.setState({
                        file: reader.result,
                        imagePreviewUrl: reader.result,
                        picstring: blobName,//reader.result,
                        picscounter: tmp,
                        loader: false,
                    });
                }


                if (tmp == 2) {
                    this.setState({
                        file: reader.result,
                        imagePreviewUrl1: reader.result,
                        picstring1: blobName,
                        picscounter: tmp,
                        loader: false,
                    });
                }

                if (tmp == 3) {
                    this.setState({
                        file: reader.result,
                        imagePreviewUrl2: reader.result,
                        picstring2: blobName,
                        picscounter: tmp,
                        loader: false,
                    });
                }

                if (tmp == 4) {
                    this.setState({
                        file: reader.result,
                        imagePreviewUrl3: reader.result,
                        picstring3: blobName,
                        picscounter: tmp,
                        loader: false,
                    });
                }





                const filestrint = reader.result;
                const params = {
                    filestrint: this.props.UserID,
                };

            }//onload end
            reader.readAsDataURL(newfile)
            //await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
            console.log(error);
        }

    }

    async callingInsert() {
        this.setState({
            loader: true,
        });

        const data = {
            LoginUserID: this.state.LoginUserID,
            location: this.state.location,
            typeofAccomodation: this.state.typeofAccomodation,
            propertyAddress: this.state.propertyAddress,
            totalbed: this.state.totalbed,
            totalbathrooms: this.state.totalbathrooms,
            parking: this.state.parking,
            internet: this.state.internet,
            Price: this.state.price,
            roomfuninishing: this.state.roomfuninishing,
            picstring: this.state.picstring,
            picstringone: this.state.picstring1,
            picstringtwo: this.state.picstring2,
            picstringthree: this.state.picstring3,
            itemid: this.uuidv4(),
            AgentId: this.state.AgentId,//mean it is owner
        };

        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&functiontype=insert&UserName=${this.state.LoginUserID}&Type=${this.state.typeofAccomodation}&Location=${this.state.location}&Bedrooms=${this.state.totalbed}&totalbathrooms=${this.state.totalbathrooms}&parking=${this.state.parking}&internet=${this.state.internet}&Price=${this.state.price}&FurnishedTyope=${this.state.roomfuninishing}&State=${this.state.location}&Deal=${this.state.deal}&picstring=${this.state.picstring}&picsstringone=${this.state.picstring1}&picsstringtwo=${this.state.picstring2}&picsstringthree=${this.state.picstring3},&AgentId=${this.state.AgentId}`
        try {
            let res = await axios.post(regurl);
            this.setState({
                universalid: res,
                loader: false,

            });
            this.props.handleRegisnteredUserId(this.state.LoginUserID);
            // console.log(res.data);
        } catch (error) {
            //console.log(error);
        }



    }


    handlerhomek = (val) => {
        this.setState({
            propertyAddress: val,
            location: val,
        })
    }

    render() {
        const varclaas = "visible";
        const varclaashidden = "hidden";


        return (
            <div className="row centeraligh">
                <div className="row ">
                    <div className="row">
                        {

                            this.state.OfferScreen == 0 &&
                            <div className="row">
                                <div className="col-sm-6  zerpadding">
                                    <div className="offerdivinner" onClick={this.handleoffersscreenflatmate.bind(this)}> 
                                    <div className="offerinternaldivpadding">

                                    Property 
                                     </div>
                                     </div>
                                </div>

                                <div className="col-sm-6  zerpadding">
                                    <div className="offerdivinner" onClick={this.handleoffersscreenflatmate.bind(this)}> 
                                    
                                    <div className="offerinternaldivpadding">
                                    
                                    Flatmate
                                    </div>
                                    
                                     </div>
                                </div>
                            </div>

                        }

                        {
                           this.state.OfferScreen == 1 &&
                           <div>
                                <h1>falt mate  Grid</h1>
                           </div>  
                        }


                        
{
                           this.state.OfferScreen == 2 &&
                           <div>
                               <h1>Property Grid</h1>
                           </div>  
                        }



                    </div>
                </div>
            </div>

        );
    }


    shoonChangewsp() {
        this.setState({
            value: 4
        });
    }


    handleClick() {
        var tmp = this.state.divcountre;
        if (tmp < 4) {
            tmp = tmp + 1;
        }
        var btntext = "Lets Start!!!";
        if (tmp > 1 && tmp < 3) {
            btntext = "Next"
        }

        if (tmp == 3) {
            btntext = "Finish"
            tmp = 3;
        }

        if (tmp < 4) {
            this.setState({
                parentdiv: 2,
                visibleclass: "visible",
                hiddenclass: "hidden",
                divcountre: tmp,
                buttontext: btntext
            });
        }
        if (tmp == 4) {
            this.callingInsert();
        }
    }


    handleGoBackClick() {
        var tmp = this.state.divcountre;
        tmp = tmp - 1;

        var btntext = "Lets Start!!!";
        if (tmp < 6) {
            btntext = "Next"

        }
        if (tmp == 1) {
            btntext = "Lets Start!!!"
        }

        this.setState({
            parentdiv: 2,
            visibleclass: "visible",
            hiddenclass: "hidden",
            divcountre: tmp,
            buttontext: btntext

        })
    }


    handletypeofAccormodation(val, divval) {
        if (divval == 1) {
            this.setState({
                typeofAccomodation: val,
                fdiv1Active: "fdvihover",
                fdiv2Active: "normaldivbutton",
                fdiv3Active: "normaldivbutton",
                fdiv4Active: "normaldivbutton",
                fdiv5Active: "normaldivbutton",
                fdiv6Active: "normaldivbutton",


            });
        }

        if (divval == 2) {
            this.setState({
                typeofAccomodation: val,
                fdiv2Active: "fdvihover",
                fdiv1Active: "normaldivbutton",
                fdiv3Active: "normaldivbutton",
                fdiv4Active: "normaldivbutton",
                fdiv5Active: "normaldivbutton",
                fdiv6Active: "normaldivbutton",
            });
        }


        if (divval == 3) {
            this.setState({
                typeofAccomodation: val,
                fdiv1Active: "normaldivbutton",
                fdiv2Active: "normaldivbutton",
                fdiv3Active: "fdvihover",
                fdiv4Active: "normaldivbutton",
                fdiv5Active: "normaldivbutton",
                fdiv6Active: "normaldivbutton",
            });
        }
        if (divval == 4) {
            this.setState({
                typeofAccomodation: val,
                fdiv1Active: "normaldivbutton",
                fdiv2Active: "normaldivbutton",
                fdiv3Active: "normaldivbutton",
                fdiv4Active: "fdvihover",
                fdiv5Active: "normaldivbutton",
                fdiv6Active: "normaldivbutton",
            });
        }
        if (divval == 5) {
            this.setState({
                typeofAccomodation: val,
                fdiv1Active: "normaldivbutton",
                fdiv2Active: "normaldivbutton",
                fdiv3Active: "normaldivbutton",
                fdiv4Active: "normaldivbutton",
                fdiv5Active: "fdvihover",
                fdiv6Active: "normaldivbutton",
            });
        }
        if (divval == 6) {
            this.setState({
                typeofAccomodation: val,
                fdiv1Active: "normaldivbutton",
                fdiv2Active: "normaldivbutton",
                fdiv3Active: "normaldivbutton",
                fdiv4Active: "normaldivbutton",
                fdiv5Active: "normaldivbutton",
                fdiv6Active: "fdvihover",
            });
        }


    }

    handlepropertyAddress(event) {
        this.setState({
            propertyAddress: event.target.value,
            location: event.target.value,
        });
    }

    handletotalbed(val, tbval) {
        switch (tbval) {

            case "100":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuutonhover",
                    totalbeddiv2: "innervbuuton",
                    totalbeddiv3: "innervbuuton",
                    totalbeddiv4: "innervbuuton",
                    totalbeddiv5: "innervbuuton",
                    totalbeddiv6: "innervbuuton",

                });
                break;

            case "1":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuuton",
                    totalbeddiv2: "innervbuutonhover",
                    totalbeddiv3: "innervbuuton",
                    totalbeddiv4: "innervbuuton",
                    totalbeddiv5: "innervbuuton",
                    totalbeddiv6: "innervbuuton",

                });
                break;

            case "2":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuuton",
                    totalbeddiv2: "innervbuuton",
                    totalbeddiv3: "innervbuutonhover",
                    totalbeddiv4: "innervbuuton",
                    totalbeddiv5: "innervbuuton",
                    totalbeddiv6: "innervbuuton",

                });
                break;


            case "3":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuuton",
                    totalbeddiv2: "innervbuuton",
                    totalbeddiv3: "innervbuuton",
                    totalbeddiv4: "innervbuutonhover",
                    totalbeddiv5: "innervbuuton",
                    totalbeddiv6: "innervbuuton",

                });
                break;


            case "4":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuuton",
                    totalbeddiv2: "innervbuuton",
                    totalbeddiv3: "innervbuuton",
                    totalbeddiv4: "innervbuuton",
                    totalbeddiv5: "innervbuutonhover",
                    totalbeddiv6: "innervbuuton",

                });
                break;


            case "5":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuuton",
                    totalbeddiv2: "innervbuuton",
                    totalbeddiv3: "innervbuuton",
                    totalbeddiv4: "innervbuuton",
                    totalbeddiv5: "innervbuuton",
                    totalbeddiv6: "innervbuutonhover",

                });
                break;


            case "6":
                this.setState({
                    totalbed: val,
                    totalbeddiv1: "innervbuuton",
                    totalbeddiv2: "innervbuuton",
                    totalbeddiv3: "innervbuuton",
                    totalbeddiv4: "innervbuuton",
                    totalbeddiv5: "innervbuuton",
                    totalbeddiv6: "innervbuutonhover",

                });
                break;


        }


    }

    handletotalbathroom(val, btval) {
        switch (btval) {

            case "1":
                this.setState({
                    totalbathrooms: val,
                    totalbathdiv1: "innervbuutonhover",
                    totalbathdiv2: "innervbuuton",
                    totalbathdiv3: "innervbuuton",
                    totalbathdiv4: "innervbuuton",
                    totalbathdiv5: "innervbuuton",
                    totalbathdiv6: "innervbuuton",

                });
                break;

            case "2":
                this.setState({
                    totalbathrooms: val,
                    totalbathdiv1: "innervbuuton",
                    totalbathdiv2: "innervbuutonhover",
                    totalbathdiv3: "innervbuuton",
                    totalbathdiv4: "innervbuuton",
                    totalbathdiv5: "innervbuuton",
                    totalbathdiv6: "innervbuuton",

                });
                break;


            case "3":
                this.setState({
                    totalbathrooms: val,
                    totalbathdiv1: "innervbuuton",
                    totalbathdiv2: "innervbuuton",
                    totalbathdiv3: "innervbuutonhover",
                    totalbathdiv4: "innervbuuton",
                    totalbathdiv5: "innervbuuton",
                    totalbathdiv6: "innervbuuton",

                });
                break;


            case "4":
                this.setState({
                    totalbathrooms: val,
                    totalbathdiv1: "innervbuuton",
                    totalbathdiv2: "innervbuuton",
                    totalbathdiv3: "innervbuuton",
                    totalbathdiv4: "innervbuutonhover",
                    totalbathdiv5: "innervbuuton",
                    totalbathdiv6: "innervbuuton",

                });
                break;


            case "5":
                this.setState({
                    totalbathrooms: val,
                    totalbathdiv1: "innervbuuton",
                    totalbathdiv2: "innervbuuton",
                    totalbathdiv3: "innervbuuton",
                    totalbathdiv4: "innervbuuton",
                    totalbathdiv5: "innervbuutonhover",
                    totalbathdiv6: "innervbuuton",

                });
                break;


            case "6":
                this.setState({
                    totalbathrooms: val,
                    totalbathdiv1: "innervbuuton",
                    totalbathdiv2: "innervbuuton",
                    totalbathdiv3: "innervbuuton",
                    totalbathdiv4: "innervbuuton",
                    totalbathdiv5: "innervbuuton",
                    totalbathdiv6: "innervbuutonhover",

                });
                break;


        }
    }

    handleparking(val, pval) {

        if (pval == 1) {
            this.setState({
                parking: val,
                parkingdiv1: "innervbuutonhover",
                parkingdiv2: "innervbuuton",
            });
        }
        if (pval == 2) {
            this.setState({
                parking: val,
                parkingdiv1: "innervbuuton",
                parkingdiv2: "innervbuutonhover",
            });
        }

    }

    handleIsAgent(val, pval) {

        if (pval == 1) {
            this.setState({
                AgentId: val,
                agentdiv1: "innervbuutonhover",
                agentdiv2: "innervbuuton",
            });
        }
        if (pval == 2) {
            this.setState({
                AgentId: val,
                agentdiv1: "innervbuuton",
                agentdiv2: "innervbuutonhover",
            });
        }

    }

    handleinternet(val, ival) {


        if (ival == 1) {
            this.setState({
                internet: val,
                internetdiv1: "innervbuutonhover",
                internetdiv2: "innervbuuton",
            });
        }
        if (ival == 2) {
            this.setState({
                internet: val,
                internetdiv1: "innervbuuton",
                internetdiv2: "innervbuutonhover",
            });
        }



    }

    handleflatemates(val, fval) {


        switch (fval) {
            case "1":
                this.setState({
                    totalflatmates: val,
                    flatmatediv1: "innervbuutonhover",
                    flatmatediv2: "innervbuuton",
                    flatmatediv3: "innervbuuton",
                    flatmatediv4: "innervbuuton",
                    flatmatediv5: "innervbuuton",
                    flatmatediv6: "innervbuuton",
                });
                break;

            case "2":
                this.setState({
                    totalflatmates: val,
                    flatmatediv2: "innervbuutonhover",
                    flatmatediv1: "innervbuuton",
                    flatmatediv3: "innervbuuton",
                    flatmatediv4: "innervbuuton",
                    flatmatediv5: "innervbuuton",
                    flatmatediv6: "innervbuuton",
                });
                break;

            case "3":
                this.setState({
                    totalflatmates: val,
                    flatmatediv3: "innervbuutonhover",
                    flatmatediv2: "innervbuuton",
                    flatmatediv1: "innervbuuton",
                    flatmatediv4: "innervbuuton",
                    flatmatediv5: "innervbuuton",
                    flatmatediv6: "innervbuuton",
                });
                break;

            case "4":
                this.setState({
                    totalflatmates: val,
                    flatmatediv4: "innervbuutonhover",
                    flatmatediv2: "innervbuuton",
                    flatmatediv3: "innervbuuton",
                    flatmatediv1: "innervbuuton",
                    flatmatediv5: "innervbuuton",
                    flatmatediv6: "innervbuuton",
                });
                break;

            case "5":
                this.setState({
                    totalflatmates: val,
                    flatmatediv5: "innervbuutonhover",
                    flatmatediv2: "innervbuuton",
                    flatmatediv3: "innervbuuton",
                    flatmatediv4: "innervbuuton",
                    flatmatediv1: "innervbuuton",
                    flatmatediv6: "innervbuuton",
                });
                break;


            case "6":
                this.setState({
                    totalflatmates: val,
                    flatmatediv6: "innervbuutonhover",
                    flatmatediv2: "innervbuuton",
                    flatmatediv3: "innervbuuton",
                    flatmatediv4: "innervbuuton",
                    flatmatediv5: "innervbuuton",
                    flatmatediv1: "innervbuuton",
                });
                break;
        }

    }

    handlebathroom(val, bval) {
        if (bval == 1) {
            this.setState({
                bathroompdiv1: "innervbuutonhover",
                bathroompdiv2: "innervbuuton",
                bathroompdiv3: "innervbuuton",
                bathroom: val,
            });
        }

        if (bval == 2) {
            this.setState({
                bathroompdiv1: "innervbuuton",
                bathroompdiv2: "innervbuutonhover",
                bathroompdiv3: "innervbuuton",
                bathroom: val,
            });
        }

        if (bval == 3) {
            this.setState({
                bathroompdiv1: "innervbuuton",
                bathroompdiv2: "innervbuuton",
                bathroompdiv3: "innervbuutonhover",
                bathroom: val,
            });
        }

    }

    handleroomfuninishing(val, fuval) {
        if (fuval == 1) {
            this.setState({
                roomfunishdiv1: "innervbuutonhover",
                roomfunishdiv2: "innervbuuton",
                roomfunishdiv3: "innervbuuton",
                roomfuninishing: val,
            });
        }

        if (fuval == 2) {
            this.setState({
                roomfunishdiv1: "innervbuuton",
                roomfunishdiv2: "innervbuutonhover",
                roomfunishdiv3: "innervbuuton",
                roomfuninishing: val,
            });
        }

        if (fuval == 3) {
            this.setState({
                roomfunishdiv1: "innervbuuton",
                roomfunishdiv2: "innervbuuton",
                roomfunishdiv3: "innervbuutonhover",
                roomfuninishing: val,
            });
        }



    }

    handlebedsize(val, bdval) {
        switch (bdval) {
            case "1": this.setState({
                bedsizediv1: "innervbuutonhover",
                bedsizediv2: "innervbuuton",
                bedsizediv3: "innervbuuton",
                bedsizediv4: "innervbuuton",
                bedsize: val,
            });
                break;


            case "2": this.setState({
                bedsizediv1: "innervbuuton",
                bedsizediv2: "innervbuutonhover",
                bedsizediv3: "innervbuuton",
                bedsizediv4: "innervbuuton",
                bedsize: val,
            });
                break;


            case "3": this.setState({
                bedsizediv1: "innervbuuton",
                bedsizediv2: "innervbuuton",
                bedsizediv3: "innervbuutonhover",
                bedsizediv4: "innervbuuton",
                bedsize: val,
            });
                break;


            case "4": this.setState({
                bedsizediv1: "innervbuuton",
                bedsizediv2: "innervbuuton",
                bedsizediv3: "innervbuuton",
                bedsizediv4: "innervbuutonhover",
                bedsize: val,
            });
                break;
        }

    }

    handleroomfeatures(val, fval) {
        var tmpfeature = this.state.roomfeatures;
        var newfinalfeature = tmpfeature + "," + val;
        switch (fval) {
            case "1":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv1: "innervbuutonhover",
                });
                break;

            case "2":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv2: "innervbuutonhover",
                });
                break;

            case "3":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv3: "innervbuutonhover",
                });
                break;

            case "4":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv4: "innervbuutonhover",
                });
                break;


            case "5":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv5: "innervbuutonhover",
                });
                break;


            case "6":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv6: "innervbuutonhover",
                });
                break;

            case "7":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv7: "innervbuutonhover",
                });
                break;

            case "8":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv8: "innervbuutonhover",
                });
                break;

            case "9":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv9: "innervbuutonhover",
                });
                break;

            case "10":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv10: "innervbuutonhover",
                });
                break;

            case "11":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv11: "innervbuutonhover",
                });
                break;

            case "12":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv12: "innervbuutonhover",
                });
                break;

            case "13":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv13: "innervbuutonhover",
                });
                break;

            case "14":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv14: "innervbuutonhover",
                });
                break;

            case "15":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv15: "innervbuutonhover",
                });
                break;

            case "16":
                this.setState({
                    roomfeatures: newfinalfeature,
                    feturediv16: "innervbuutonhover",
                });
                break;

        }

    }

    handlearent(event) {
        this.setState({
            rent: event.target.value,
        });
    }

    handlebond(event) {
        this.setState({
            bonds: event.target.value,
        });
    }

    handlebills(event) {
        this.setState({
            bills: event.target.value,
        });
    }

    hovermefdiv1() {
        this.setState({ fdiv1Active: "fdvihover" });
    }

    removehovermefdiv1(e) {

        this.setState({ fdiv1Active: "normaldivbutton" });
    }

    hovermefdiv2() { this.setState({ fdiv2Active: "fdvihover" }); }

    removehovermefdiv2(e) { this.setState({ fdiv2Active: "normaldivbutton" }); }

    hovermefdiv3() { this.setState({ fdiv3Active: "fdvihover" }); }

    removehovermefdiv3(e) { this.setState({ fdiv3Active: "normaldivbutton" }); }

    hovermefdiv4() { this.setState({ fdiv4Active: "fdvihover" }); }

    removehovermefdiv4(e) { this.setState({ fdiv4Active: "normaldivbutton" }); }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async  AzureApoihandleImageUpload(event) {
        this.setState({
            loader: true,
        });
        const imageFile = event.target.files[0];
        //console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        //console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
            usbd: 22,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            let reader = new FileReader();
            let file = compressedFile;
            var newfile = file;
            //console.log(compressedFile);
            reader.onloadend = () => {

                var tmp = this.state.picscounter;
                tmp = tmp + 1;
                // alert(tmp);
                const data = {
                    picstring: reader.result,

                }

                const filestrint = reader.result;
                const params = {
                    filestrint: this.props.UserID,
                };
                var loginurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=${filestrint}`

                axios
                    .post(loginurl, params)
                    .then(res => {
                        console.log(res.data[0].universalid);
                        if (tmp == 1) {
                            this.setState({
                                file: reader.result,
                                imagePreviewUrl: reader.result,
                                picstring: res.data[0].universalid,//reader.result,
                                picscounter: tmp,
                                loader: false,
                            });
                        }


                        if (tmp == 2) {
                            this.setState({
                                file: reader.result,
                                imagePreviewUrl1: reader.result,
                                picstring1: res.data[0].universalid,
                                picscounter: tmp,
                                loader: false,
                            });
                        }

                        if (tmp == 3) {
                            this.setState({
                                file: reader.result,
                                imagePreviewUrl2: reader.result,
                                picstring2: res.data[0].universalid,
                                picscounter: tmp,
                                loader: false,
                            });
                        }

                        if (tmp == 4) {
                            this.setState({
                                file: reader.result,
                                imagePreviewUrl3: reader.result,
                                picstring3: res.data[0].universalid,
                                picscounter: tmp,
                                loader: false,
                            });
                        }

                    })
                    .catch(err => {
                        console.log("Error in CreateBook!");
                    });


            }







            reader.readAsDataURL(file)

            //await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
            console.log(error);
        }

    }

}

export default withTranslation()(Offers);
