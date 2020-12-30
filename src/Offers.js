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
import PropertyGrid from './propertyGrids'
import delicon from './del.jpg';


library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

export class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginUserID: this.props.UserID,
            OfferScreen: 0,
            ObjectArray: [],
            PropertyArray:[],


        }

        //screen 1 flat mate grid
        //screen 2 property grid







        this.handleoffersscreenflatmate = this.handleoffersscreenflatmate.bind(this);
        this.handleoffersscreenproperty = this.handleoffersscreenproperty.bind(this);
        this.handleoffersscreenflatmatemsg = this.handleoffersscreenflatmatemsg.bind(this);
        this.gobackbutton = this.gobackbutton.bind(this);


    }

    componentDidMount() {
        this.getblobtoken();
        this.fetchmessages();
        this.fetchproperties();
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


    async fetchproperties() {
        var _Response = null;
        var TempUserProfileExisits = 0;
        var TempDivCounter = 0;
        var retrueneddata = [];
        var TempCarousalData = [];
        var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=getallbyagent";
        try {
          let res = await axios.post(loginurl);
          console.log("Proprties"+res);
          var xcount = 10;
          for (var i = 0; i < res.data.length; i++) {
            xcount = xcount + 1;
            var obs = {
              'typeofAccomodation': res.data[i].Room_in_an_existing,//.metadata.colName,
              'rent': res.data[i].Price,//metadata.colName,
              'totalbed': res.data[i].Bedrooms,//.metadata.colName,
              'propertyAddress': res.data[i].Location,//.metadata.colName,
              'Imagestr': this.state.imgstarturl + res.data[i].picstring + this.state.imgStartEnd,//.metadata.colName,
              'key': xcount,
              'Price': this.formatMoney(res.data[i].Price),
              'PropertyId': res.data[i].PropertyId,
            }
            retrueneddata.push(obs);
            
    
    
          }
          this.setState({
            PropertyArray: retrueneddata,
            
            loader: false,
          });
    
        } catch (error) {
    
        }
      }

    gobackbutton(event) {
        this.setState({
            OfferScreen: 0,
        });
    }


    handleoffersscreenflatmatemsg(event) {
        this.setState({
            OfferScreen: 3,
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
    async deletemsgitem(messageid){
        this.setState({
            loader: true,
        });
        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerMessages?code=Jfa1Z7DWGy4a30z4gz16iWIzn5nTgCt3UFrOPFrQOYgCPeSIFR69pQ==&email=${messageid}&messageid=${messageid}&functiontype=u`;
        try {
            let res = await axios.post(regurl);
            this.setState({
                loader: false,
            });
            this.fetchmessages();
            
        } catch (error) {
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

    
   

    async fetchmessages() {
        var _Response = null;
        var TempUserProfileExisits = 0;
        var TempDivCounter = 0;
        var retrueneddata = [];
        var TempCarousalData = [];
        var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=msg";
        try {
            let res = await axios.post(loginurl);
            console.log(res);
            var xcount = 10;
            for (var i = 0; i < res.data.length; i++) {
                xcount = xcount + 1;
                var obs = {
                    'Type': res.data[i].Type,//.metadata.colName,
                    'Location': res.data[i].Location,//metadata.colName,
                    'LoginUserID': res.data[i].LoginUserID,//.metadata.colName,
                    'Message': res.data[i].Message,//.metadata.colName,
                    'key': xcount,
                    'MessageId': res.data[i].MessageId,//.metadata.colName,    
                }
                retrueneddata.push(obs);


            }
            this.setState({
                ObjectArray: retrueneddata,
                loader: false,
            });

        } catch (error) {

        }
    }

    render() {
        var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
            return (
                <div  key={item["key"]}> 
            
                    <div className="row classforgrid">
                        <div className="col-sm-2 ">
                            <div className="">
                                {item["Message"]}
                            </div>
                        </div>
                        <div className="col-sm-2 ">
                            <div className="">
                                {item["Type"]}
                            </div>
                        </div>
                        <div className="col-sm-2 ">
                            <div className="">
                                {item["Location"]}
                            </div>
                        </div>
                        <div className="col-sm-2 ">
                            <div className="">
                              
                 <img className="smallimages"  src={delicon} key={i} alt="First slide" onClick={this.deletemsgitem.bind(this, item["MessageId"])}  />
         
                             
                            </div>
                        </div>

                       
                    </div>


                </div>
            );
        });


        return (
            <div className="row ">
            
                <div className="fullwidght">
                    <div className="container ">
                        {
                            this.state.OfferScreen == 0 &&
                            <div className="row">
                                <div className="col-sm-2  "> </div>
                                <div className="col-sm-3  ">
                                    <div className="" onClick={this.handleoffersscreenflatmatemsg.bind(this)}>
                                        <div className="mybuttons btn btn-primary">

                                            Messages
                                     </div>
                                    </div>
                                </div>
                                <div className="col-sm-3  ">
                                    <div className="" onClick={this.handleoffersscreenflatmate.bind(this)}>
                                        <div className="mybuttons btn btn-primary">

                                            Property
                                     </div>
                                    </div>
                                </div>
                                <div className="col-sm-3  ">
                                    <div className="" onClick={this.handleoffersscreenflatmate.bind(this)}>

                                        <div className="mybuttons btn btn-primary">

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

{
                            this.state.OfferScreen == 3 &&
                            <div>
                                {SubProjectArrays}
                            </div>
                        }

                    </div>
                </div>

                {this.state.OfferScreen == 2 &&

                    <PropertyGrid />
                }
            </div>

        );
    }


    shoonChangewsp() {
        this.setState({
            value: 4
        });
    }

    handleGoBackClick() {

        this.setState({
            parentdiv: 2,

        })
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
