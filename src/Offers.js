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
import { faCog, faPhone, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faTimes, } from '@fortawesome/free-solid-svg-icons';

import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lockz from './Locationsuggest';
import delicon from './del.jpg';
import EProperty from './propertyedit';

library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)
export class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginUserID: this.props.UserID,
            OfferScreen: 0, //zero is message
            ObjectArray: [],
            PropertyArray: [],
            ShowCarousal: false,
            LoginUserID: this.props.UserID,
            AgentMobile: this.props.AgentMobile,
            AgentPic: this.props.AgentPic,
            AgentName: this.props.AgentName,
            AgentCompany: this.props.AgentComapny,
            companylogo:this.props.companylogo,
            ItemObject:[],
            imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
            imgstarturlprofiles: "https://userfunctionsapi.blob.core.windows.net/profilepics/",
            imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",


        }
        //screen 1 flat mate grid
        //screen 2 property grid
        this.handleoffersscreenflatmate = this.handleoffersscreenflatmate.bind(this);
        this.handleoffersscreenproperty = this.handleoffersscreenproperty.bind(this);
        this.handleoffersscreenflatmatemsg = this.handleoffersscreenflatmatemsg.bind(this);
        this.gobackbutton = this.gobackbutton.bind(this);

    }

    componentDidMount() {

        console.log(this.state.LoginUserID);
        console.log(this.state.AgentMobile)
        console.log(this.state.AgentPic)
        console.log(this.state.AgentName)
        console.log(this.state.AgentComapny)

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
            console.log("Proprties" + res);
            var xcount = 10;
            for (var i = 0; i < res.data.length; i++) {
                xcount = xcount + 1;

                var obs = {

                    'totalbathrooms': res.data[i].totalbathrooms,//.metadata.colName,
                    'propertyAddress': res.data[i].Location,//.metadata.colName,
                    'PropertyId': this.state.PropertyId,// + res.data[i].picstring + this.state.imgStartEnd,//.metadata.colName,
                    'key': xcount,
                    'Price': this.formatMoney(res.data[i].Price),
                    'PropertyId': res.data[i].PropertyId,

                    'typeofAccomodation': res.data[i].Room_in_an_existing,//.metadata.colName,
                    'rent': res.data[i].Price,//metadata.colName,
                    'Purpose': res.data[i].Purpose,
                    'Imagestr': this.state.imgstarturl + res.data[i].picstring + this.state.imgStartEnd,//.metadata.colName,
                    'AgentNumber': res.data[i].AgentNumber,
                    'AgentPic': res.data[i].AgentPic,
                    'agentname': res.data[i].agentname,
                    'description': res.data[i].description,
                    'agentcompany': res.data[i].agentcompany,
                    'Bedrooms': res.data[i].Bedrooms,
                    'Deal': res.data[i].Deal,
                    'FurnishedTyope': res.data[i].FurnishedTyope,
                    'Location': res.data[i].Location,
                    'LoginUserID': res.data[i].LoginUserID,

                    'State': res.data[i].State,
                    'Type': res.data[i].Type,
                    'internet': res.data[i].internet,
                    'parking': res.data[i].parking,
                    'picsstringone': res.data[i].picsstringone,
                    'picsstringthree': res.data[i].picsstringthree,
                    'picsstringtwo': res.data[i].picsstringtwo,
                    'picstring': this.state.imgstarturl + res.data[i].picstring + this.state.imgStartEnd,
                    'totalbathrooms': res.data[i].totalbathrooms,
                    'VideoLink': res.data[i].VideoLink,
                    'OwnerName': res.data[i].OwnerName,
                    'OwnerEmail': res.data[i].OwnerEmail,
                    'OwnerPhone': res.data[i].OwnerPhone,
                    'BuildingNumber':res.data[i].BuildingNumber,
                    'UnitNumber':res.data[i].UnitNumber,




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

    formatMoney(num) {
        num = parseInt(num);
        var p = num.toFixed(2).split(".");
        return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }

    itemupdateItem(itemid) {
var ExistingObjst=this.state.PropertyArray;

var filteredarray = ExistingObjst.filter(person => person["PropertyId"] == itemid);


        this.setState({
            OfferScreen: 500,
            ItemObject:filteredarray,

        });
    }


    itemdealfinishitem(itemid) {
        // alert(itemid);

        this.setState({
            ShowCarousal: true,
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
    handleoffersscreenEarning(event) {
        this.setState({
            OfferScreen: 4,
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
    async deletemsgitem(messageid) {
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
                <div key={item["key"]}>
                    {
                        i == 0 &&
                        <div className="row classforgrid">
                            <div className="col-sm-2 gridheadher ">
                                <div className="gridheadher">
                                    <h3>Type</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">
                                <div className="">
                                    <h3>Location</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">
                                <div className="">
                                    <h3>Message</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">

                            </div>


                        </div>
                    }
                    <div className="row classforgrid">
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["Message"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["Type"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["Location"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">

                                <img className="gridimage" src={delicon} key={i} alt="First slide" onClick={this.deletemsgitem.bind(this, item["MessageId"])} />


                            </div>
                        </div>


                    </div>


                </div>
            );
        });


        var ProperTiesTempArray = this.state.PropertyArray.map((item, i) => {
            return (
                <div key={item["key"]}>
                    {
                        i == 0 &&
                        <div className="row classforgrid">
                            <div className="col-sm-2 gridheadher ">
                                <div className="gridheadher">
                                    <h3>Type</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">
                                <div className="">
                                    <h3>Location</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">
                                <div className="">
                                    <h3>Message</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">

                            </div>
                            <div className="col-sm-2 gridheadher">

                            </div>
                            <div className="col-sm-2 gridheadher">

                            </div>


                        </div>
                    }
                    <div className="row classforgrid">
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["Type"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["Price"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["Location"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                <img className="gridimage" src={delicon} key={i} alt="First slide" onClick={this.deletemsgitem.bind(this, item["MessageId"])} />
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">

                                <div className="col-sm-10 mybuttons btn btn-primary" onClick={this.itemupdateItem.bind(this, item["PropertyId"])}>
                                    Update
                                </div>






                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">

                                <div className="col-sm-10 mybuttons btn btn-primary" onClick={this.itemdealfinishitem.bind(this, item["PropertyId"])}>
                                    Finish Deal
                                </div>


                            </div>
                        </div>


                    </div>


                </div>
            );
        });

        return (
            <div className="row ">


                <div className="row ">
                    {this.state.OfferScreen > 0 &&
                        <div className="" onClick={this.gobackbutton.bind(this)}>
                            <div className="">
                                <div className="col-sm-2">

                                </div>
                                <div className="col-sm-12 mybuttons btn btn-primary">
                                    Go Back
                                </div>
                            </div>
                        </div>

                    }

                </div>

                <div className="fullwidght">
                    <div className="container ">
                        {
                            this.state.OfferScreen == 0 &&
                            <div className="row">

                                <div className="col-sm-3  ">
                                    <div className="" onClick={this.handleoffersscreenflatmatemsg.bind(this)}>
                                        <div className="mybuttons btn btn-primary">

                                            Messages
                                     </div>
                                    </div>
                                </div>
                                <div className="col-sm-3  ">
                                    <div className="" onClick={this.handleoffersscreenproperty.bind(this)}>
                                        <div className="mybuttons btn btn-primary">

                                            Property
                                     </div>
                                    </div>
                                </div>
                                <div className="col-sm-3  ">
                                    <div className="" onClick={this.handleoffersscreenEarning.bind(this)}>
                                        <div className="mybuttons btn btn-primary">
                                            My Earnings
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
                                {ProperTiesTempArray}
                            </div>
                        }

                        {
                            this.state.OfferScreen == 3 &&
                            <div className="">
                                {SubProjectArrays}
                            </div>
                        }

                        {
                            this.state.OfferScreen == 4 &&
                            <div className="">
                                <h1>Increase your earning</h1>
                            </div>
                        }



                        {
                            this.state.OfferScreen == 500 &&
                            <div className="">
                                <div className="col-sm-12">
                                    <EProperty Country={this.state.UserCountry}
                                        companylogo={this.state.companylogo}
                                        AgentName={this.state.AgentName}
                                        AgentComapny={this.state.AgentCompany}
                                        AgentMobile={this.state.AgentMobile}
                                        AgentPic={this.state.AgentPic}
                                        UserID={this.state.LoginUserID}
                                        handleRegisnteredUserId={this.handleRegisnteredUserId}
                                        ItemObject={this.state.ItemObject}
                                        />
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {
                    this.state.ShowCarousal == true &&

                    <div className="parentdiv">
                        <div className="closebuttondi" onClick={this.CloseModal}>
                            <FontAwesomeIcon icon={faTimes} /></div>

                        <div className="carousaldiv">
                            <div className="row">
                                <div className="col-sm-8 ">
                                </div>
                            </div>
                        </div>
                    </div>
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
