//https://fontawesome.com/icons?d=gallery&m=free
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, Component } from 'react'
import logo from './logo.svg';
import uploader from './uloaaderimage.gif'
import './App.css';
import { Header } from "./header/header";
import Footer from "./footer/footer";
import Bodycards from "./bodycards";
import { Rating } from "./rating";
import Looking from './lookingforroom';
import RoomOwner from './roomowner';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { library } from '@fortawesome/fontawesome-svg-core';
import Carousel from 'react-bootstrap/Carousel'
import { faBath, faCog, faPhone, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faTimes, } from '@fortawesome/free-solid-svg-icons';
import gmails from './gmail.gif';
import whatsapp from './whatsapp.gif';
import calls from './call.gif';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from './Message'
import GoogleMap from './googlemap'
import agent from './agent.png'
import Heart from "react-animated-heart";
import Propertyanalytics from './propertyanalytics';
import message from './msgicon.jpg';
import emailicon from './emailicon.png'


library.add(faBath,faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

class bodycards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjectArray: this.props.ObjectArray,
      ObjectArrayTenant: [],
      ObjectArrayBids: [],

      AgentObjectArray: this.props.AgentObjectArray,
      loader: true,
      ImagesArray: [],
      ShowCarousal: false,
      blobtoken: "",
      myBlobs: [],
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",
      carousalObject: this.props.carousalObject,
      carousalObjectitem: [],
      carousalItemCount: 0,
      currenproperyid: 0,
      selectedIndex: 0,
      selectedPropertyId: 0,
      selectedBedrooms: 0,
      selectedLocation: 0,
      selectedPrice: 0,
      selectedFurnitureType: 0,
      selectedType: "",
      selectedParking: "",
      selectedPool: "",
      showMyMap: 0,

      AgentComapny: this.props.AgentComapny,
      AgentMobile: this.props.AgentMobile,
      AgentPic: this.props.AgentPic,
      AgentcarousalObject: this.props.AgentcarousalObject,
      AgentcarousalObjectitem: [],
      AgentName: this.props.AgentName,

      ShowAnalytics: 0,
      ShowAgentDetails: 0,

      ButtonMapClose: "Location",
      ButtonShownumber: "Number",
      isClick: false,
      showAnalytics: false,

    }
    this.CloseModal = this.CloseModal.bind(this);
    this.showmynumber = this.showmynumber.bind(this);
    this.CloseModalAgentDtails = this.CloseModalAgentDtails.bind(this);
    this.setClick = this.setClick.bind(this);

  }

  setClick() {
    var tmp = this.state.isClick;
    if (tmp == true) {
      this.setState({
        isClick: false,
        showAnalytics: 0,
      });
    } else {
      this.setState({
        isClick: true,
        showAnalytics: 1,
      });
    }
  }


  showmymapfunction() {
    var TmpText = ""
    var TempMapIndicator = 1;
    if (this.state.showMyMap == 1) {
      TmpText = "Location";
      TempMapIndicator = 0;
    } else {
      TmpText = "Show Pics"
      TempMapIndicator = 1;
    }
    this.setState({
      showMyMap: TempMapIndicator,
      ButtonMapClose: TmpText
    });
  }

  CloseModalAgentDtails() {
    this.setState({
      ShowAgentDetails: 0,
      ButtonShownumber: "Number"
    });
  }

  showmynumber() {
    //ButtonShownumber
    //alert(this.state.AgentMobile);

    var TmpText = ""
    var TempMapIndicator = 1;
    if (this.state.showMyMap == 1) {
      TmpText = "Number";
      TempMapIndicator = 0;
    } else {
      TmpText = "Show Pics"
      TempMapIndicator = 1;
    }
    this.setState({
      ShowAgentDetails: TempMapIndicator,
      ButtonShownumber: TmpText
    });



  }

  getCarousal(propertyid) {

    if (this.state.currenproperyid != 0) {
      // return;
    }
    this.setState({
      carousalObjectitem: [],
      ShowCarousal: true,
      selectedPropertyId: propertyid

    });
    var tmpitem = this.state.carousalObject.filter(properties => properties.PropertyId === propertyid);
    var TampCarousalItem = [];

    var tempItem1 = tmpitem;
    var tempItem2 = tmpitem;
    var tempItem3 = tmpitem;
    var tempItem4 = tmpitem;
    //var tmpitem1 = this.state.carousalObject.filter(properties => properties.PropertyId === propertyid)
    // .map((item, id) => {
    // console.log(item[id]);
    //});

    var tmp1stImag = tmpitem[0].picstring;
    var tmp2stImag = tmpitem[0].picsstringone;
    var tmp3stImag = tmpitem[0].picsstringtwo;
    var tmp4stImag = tmpitem[0].picsstringthree;
    tmp1stImag = tmp1stImag.replace(",", "");
    tmp2stImag = tmp2stImag.replace(",", "");
    tmp3stImag = tmp3stImag.replace(",", "");
    tmp4stImag = tmp4stImag.replace(",", "");


    if (tmp1stImag.length > 3) {

      var objectcarousalone = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp1stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }
      TampCarousalItem.push(objectcarousalone);
    }
    if (tmp2stImag.length > 3) {

      var objectcarousaltwo = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp2stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }

      TampCarousalItem.push(objectcarousaltwo);
    }

    if (tmp3stImag.length > 3) {
      var objectcarousalthree = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp3stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }

      TampCarousalItem.push(objectcarousalthree);
    }

    if (tmp4stImag.length > 3) {
      var objectcarousalfour = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp4stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }

      TampCarousalItem.push(objectcarousalfour);
    }

    this.setState({
      carousalObjectitem: TampCarousalItem,
      ShowCarousal: true,
      currenproperyid: 0,
      selectedBedrooms: tmpitem[0].Bedrooms,
      selectedLocation: tmpitem[0].Location,
      selectedPrice: tmpitem[0].Price,
      selectedFurnitureType: tmpitem[0].FurnishedTyope,
      selectedType: tmpitem[0].Type,
      selectedParking: tmpitem[0].parking,
      AgentName: tmpitem[0].agentname,
      AgentComapny: tmpitem[0].agentcompany,
      AgentPic: `https://userfunctionsapi.blob.core.windows.net/profilepics/${tmpitem[0].AgentPic}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
      AgentMobile: tmpitem[0].AgentNumber,

    });
  }

  async fetchproperties() {
    var _Response = null;
    var TempUserProfileExisits = 0;
    var TempDivCounter = 0;
    var retrueneddata = [];
    var TempCarousalData = [];
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=b";
    try {
      let res = await axios.post(loginurl);
      console.log(res);
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
          'AgentNumber': res.data[i].AgentNumber,
          'AgentPic': res.data[i].AgentPic,
          'agentname': res.data[i].agentname,
          'description': res.data[i].description,
          'agentcompany': res.data[i].agentcompany,
        }
        retrueneddata.push(obs);
        var objectcarousal = {
          'AgentId': res.data[i].AgentId,
          'Bedrooms': res.data[i].Bedrooms,
          'Deal': res.data[i].Deal,
          'FurnishedTyope': res.data[i].FurnishedTyope,
          'Location': res.data[i].Location,
          'LoginUserID': res.data[i].LoginUserID,
          'Price': this.formatMoney(res.data[i].Price),
          'PropertyId': res.data[i].PropertyId,
          'State': res.data[i].State,
          'Type': res.data[i].Type,
          'internet': res.data[i].internet,
          'parking': res.data[i].parking,
          'picsstringone': res.data[i].picsstringone,
          'picsstringthree': res.data[i].picsstringthree,
          'picsstringtwo': res.data[i].picsstringtwo,
          'picstring': res.data[i].picstring,
          'totalbathrooms': res.data[i].totalbathrooms,
          'AgentNumber': res.data[i].AgentNumber,
          'AgentPic': res.data[i].AgentPic,
          'agentname': res.data[i].agentname,
          'description': res.data[i].description,
          'agentcompany': res.data[i].agentcompany,
        }
        TempCarousalData.push(objectcarousal);


      }
      this.setState({
        ObjectArray: retrueneddata,
        carousalObject: TempCarousalData,
        loader: false,
      });

    } catch (error) {

    }
  }

  formatMoney(num) {
    num = parseInt(num);
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
      return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

  async fetchpropertiesagent() {
    var _Response = null;
    var TempUserProfileExisits = 0;
    var TempDivCounter = 0;
    var retrueneddata = [];
    var TempCarousalData = [];
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=agent";
    try {
      let res = await axios.post(loginurl);
      console.log("Agent" + res);
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
          'Price': res.data[i].Price,
          'PropertyId': res.data[i].PropertyId,
          'profilepicname': res.data[i].profilepicname,
        }
        retrueneddata.push(obs);
        var objectcarousal = {
          'AgentId': res.data[i].AgentId,
          'Bedrooms': res.data[i].Bedrooms,
          'Deal': res.data[i].Deal,
          'FurnishedTyope': res.data[i].FurnishedTyope,
          'Location': res.data[i].Location,
          'LoginUserID': res.data[i].LoginUserID,
          'Price': res.data[i].Price,
          'PropertyId': res.data[i].PropertyId,
          'State': res.data[i].State,
          'Type': res.data[i].Type,
          'internet': res.data[i].internet,
          'parking': res.data[i].parking,
          'picsstringone': res.data[i].picsstringone,
          'picsstringthree': res.data[i].picsstringthree,
          'picsstringtwo': res.data[i].picsstringtwo,
          'picstring': res.data[i].picstring,
          'totalbathrooms': res.data[i].totalbathrooms,
          'profilepicname': res.data[i].profilepicname,
        }
        TempCarousalData.push(objectcarousal);


      }
      this.setState({
        AgentObjectArray: retrueneddata,
        AgentcarousalObject: TempCarousalData,
        loader: false,
      });

    } catch (error) {

    }
  }

  handleSelect = (selectedIndex, e) => {
  }


  async getblobtoken() {
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerStorageToken?code=TqfhfkL7Vgn0x/H7JHdqZQXTCzQZSMvAVcmKk2teC3ZOgTVSN3QYaA==";
    try {
      let res = await axios.post(loginurl);
      this.setState({
        blobtoken: res,
        loader: false,
      });
      // this.fetchblobs();
      //this.fetchpropertiesagent();
      // this.fetchproperties();

    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getblobtoken();
    //this.fetchpropertiesagent();

  }

  CloseModal() {
    this.setState({
      ShowCarousal: false,
      showMyMap: 0,
      ShowAgentDetails: 0,
      ShowAnalytics: 0,
      showMyMap: 0,

    });
  }

  componentDidMountme() {
    var retrueneddata = [];

    var xcount = 102;
    axios
      .get('http://localhost:5000/cardtenants/')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          xcount = xcount + 1;

          var obs = {
            'Area': res.data[i][0].value,//.metadata.colName,
            'rent': res.data[i][1].value,//metadata.colName,
            'DatetoCome': res.data[i][2].value,//.metadata.colName,
            'age': res.data[i][3].value,//.metadata.colName,
            'Imagestr': res.data[i][4].value,//.metadata.colName,
            'key': xcount,
            'tenantid': res.data[i][5].value,//.metadata.colName,
          }
          retrueneddata.push(obs);
        }
        console.log(retrueneddata);
        this.setState({
          ObjectArrayTenant: retrueneddata,
          loader: false,
        });
      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });
  }

  async  blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  }

  async fetchblobs(file) {
    //    //https://userfunctionsapi.azurewebsites.net/?st=2020-11-04T18%3A49%3A22Z&se=2020-11-04T19%3A49%3A22Z&sp=W&sv=2018-03-28&sr=b&sig=2tbOll2oU1JdvkxLiHui%2BpRU6nHqsA0uKNtDF%2BsfZQU%3D

    const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
    const sas = this.state.blobtoken;
    var finalToken = sas.data.token;

    const STORAGE_ACCOUNT_NAME = 'userfunctionsapi'
    const CONTAINER_NAME = 'myfiles'
    // for browser, SAS_TOKEN is get from API?
    const SAS_TOKEN = finalToken;
    const sasURL = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${SAS_TOKEN}`

    const blobServiceClient = new BlobServiceClient(sasURL)
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME)

    let i = 1;

    var tempblog = [];
    let blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {

      const blobClient = containerClient.getBlobClient(blob.name);
      // const downloadBlockBlobResponse = await blobClient.download();
      //const downloaded = await this.blobToString(await downloadBlockBlobResponse.blobBody);
      //console.log("Downloaded blob content", downloaded);
      var imgstr = blobClient.url;
      // [Browsers only] A helper method used to convert a browser Blob into string.
      var obs = {
        'name': blob.name,//.metadata.colName,
        str: imgstr

      }




      tempblog.push(obs);
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    this.setState({
      myBlobs: tempblog,

    });
    this.fetchproperties();







  }

  getCarousalAgent(propertyid) {

    if (this.state.currenproperyid != 0) {
      // return;
    }
    this.setState({
      AgentcarousalObjectitem: [],
      ShowCarousal: true,
      selectedPropertyId: propertyid

    });
    var tmpitem = this.state.AgentcarousalObject.filter(properties => properties.PropertyId === propertyid);
    var TampCarousalItem = [];

    var tempItem1 = tmpitem;
    var tempItem2 = tmpitem;
    var tempItem3 = tmpitem;
    var tempItem4 = tmpitem;


    var tmp1stImag = tmpitem[0].picstring;
    var tmp2stImag = tmpitem[0].picsstringone;
    var tmp3stImag = tmpitem[0].picsstringtwo;
    var tmp4stImag = tmpitem[0].picsstringthree;
    tmp1stImag = tmp1stImag.replace(",", "");
    tmp2stImag = tmp2stImag.replace(",", "");
    tmp3stImag = tmp3stImag.replace(",", "");
    tmp4stImag = tmp4stImag.replace(",", "");


    if (tmp1stImag.length > 3) {

      var objectcarousalone = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp1stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
        'agentpic': tmpitem[0].parking,
      }
      TampCarousalItem.push(objectcarousalone);
    }
    if (tmp2stImag.length > 3) {

      var objectcarousaltwo = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp2stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
        'agentpic': tmpitem[0].parking,
      }

      TampCarousalItem.push(objectcarousaltwo);
    }

    if (tmp3stImag.length > 3) {
      var objectcarousalthree = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp3stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
        'agentpic': tmpitem[0].parking,
      }

      TampCarousalItem.push(objectcarousalthree);
    }

    if (tmp4stImag.length > 3) {
      var objectcarousalfour = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': this.formatMoney(tmpitem[0].Price),
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp4stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
        'agentpic': tmpitem[0].parking,
      }

      TampCarousalItem.push(objectcarousalfour);
    }

    this.setState({
      carousalObjectitem: TampCarousalItem,
      ShowCarousal: true,
      currenproperyid: 0,
      selectedBedrooms: tmpitem[0].Bedrooms,
      selectedLocation: tmpitem[0].Location,
      selectedPrice: tmpitem[0].Price,
      selectedFurnitureType: tmpitem[0].FurnishedTyope,
      selectedType: tmpitem[0].Type,
      selectedParking: tmpitem[0].parking,
      AgentName: tmpitem[0].agentname,
      AgentComapny: tmpitem[0].agentcompany,
      AgentPic: `https://userfunctionsapi.blob.core.windows.net/profilepics/${tmpitem[0].AgentPic}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
      AgentMobile: tmpitem[0].AgentNumber,

    });
  }

  render() {



    var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
      return (
        <div className="col-sm-6" key={item["key"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} >
          <Card style={{ width: '100%' }} className="bordershadow" key={item["typeofAccomodation"]}>
            <Card.Img height="220px" variant="top" src={item["Imagestr"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Type"]}</div>
                <div className="col-sm-12 paragraphcss">{item["propertyAddress"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Price"]}</div>

              </div>

              <div className="row">
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={calls} width="40px" height="39px" />
                  </div>
                </div>
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={whatsapp} width="50px" height="39px" />
                  </div>   </div>
                <div className="col-sm-4 zerpadding">
                  <div className="buttnemail" >Email</div>
                </div>
                <div className="col-sm-4 zerpadding">
                  <div className="myicondiv">
                    <div className="buttn" >Message</div>
                  </div>
                </div>

              </div>

            </Card.Body>
          </Card>
        </div>
      );
    });

    var AGentSubProjectArrays = this.state.AgentObjectArray.map((item, i) => {

      return (
        <div className="col-sm-6" key={item["key"]} onClick={this.getCarousalAgent.bind(this, item["PropertyId"])} >
          <Card style={{ width: '100%' }} className="bordershadow" key={item["Type"]}>
            <Card.Img height="220px" variant="top" src={item["Imagestr"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Type"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Location"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Price"]}</div>

              </div>

              <div className="row">
                <div className="col-sm-3 zerpadding">
                  <div className="myicondiv">
                  <FontAwesomeIcon icon={faBath} />
                  </div>
                </div>
                <div className="col-sm-3 zerpadding">
                  <div className="myicondiv">
                  <FontAwesomeIcon icon={faTimes} />
                  </div>   </div>
                <div className="col-sm-3 zerpaddingEmail">
                <FontAwesomeIcon icon={faTimes} />


                </div>
                <div className="col-sm-3 zeroPaddingMessage">
                  <div className="myicondiv">
                  <FontAwesomeIcon icon={faTimes} />

                  </div>
                </div>

              </div>

            </Card.Body>
          </Card>
        </div>
      );
    });

    var SubProjectArrays2 = this.state.ObjectArrayTenant.map((item, i) => {
      return (<div className="mansearch" key={item["key"]}>
        <div className="col-sm-3 " >

          <Card style={{ width: '11rem' }} className="bordershadow" key={i} >
            <Card.Img height="120px" variant="top" src={item["Imagestr"]} />
            <Card.Body>

              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Area"]}</div>
                <div className="col-sm-12 paragraphcss">{item["age"]}Years</div>
              </div>
              <div className="row">
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faAtlas} />
                  </div>
                </div>
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>   </div>
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faCog} />
                  </div>
                </div>
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </div>
                </div>


              </div>

            </Card.Body>
          </Card>
        </div>
      </div>);
    });

    var carousalitem = null;
    carousalitem = this.state.carousalObjectitem.map((item, i) => {
      return (
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100"
            src={item.mypicstring} key={i}
            alt="First slide"
          />

        </Carousel.Item>






      );

    });


    if (this.state.ObjectArrayBids != null) {
      var SubProjectArrays3 = this.state.ObjectArrayBids.map((item, i) => {
        return (<div className="mansearch"  >
          <div className="col-sm-3 ">

            <Card style={{ width: '11rem' }} className="bordershadow" key={i} >
              <Card.Img height="120px" variant="top" src={item["productpic"]} />
              <Card.Body>

                <div className="row bottomborder" >
                  <div className="col-sm-12 paragraphcss">Dubai Marina</div>
                  <div className="col-sm-12 paragraphcss">Dubai Marina</div>
                </div>

                <div className="row">
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faAtlas} />
                    </div>
                  </div>
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>   </div>
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faCog} />
                    </div>
                  </div>
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                  </div>


                </div>

              </Card.Body>
            </Card>
          </div>
        </div>);
      });
    }

    return (
      <div className="container-fluid">
        <div className="row" >
          {
            this.state.loader == true &&
            <div className="loader"></div>
          }
          {SubProjectArrays}
          {SubProjectArrays2}
          {SubProjectArrays3}
          {AGentSubProjectArrays}

        </div>
        <div>
          {
            this.state.ShowCarousal == true &&

            <div className="parentdiv">
              <div className="closebuttondi" onClick={this.CloseModal}>
                <FontAwesomeIcon icon={faTimes} /></div>

              <div className="carousaldiv">
                <div className="row">
                  <div className="col-sm-8 ">
                    <Carousel>
                      {carousalitem}
                    </Carousel>


                    {
                      this.state.showMyMap == 1 &&
                      <div className="carousaldiv2">
                        <GoogleMap />
                      </div>
                    }

                    {
                      this.state.ShowAnalytics == 1 &&
                      <div className="carousaldiv4">
                        <Propertyanalytics />
                      </div>
                    }


                    {
                      this.state.ShowAgentDetails == 1 &&
                      <div className="carousaldiv3">
                        <div className="closebuttondi2" onClick={this.CloseModalAgentDtails}>
                          <FontAwesomeIcon icon={faTimes} /></div>
                        <div className="row ">
                          <div className="col-sm-6">
                            <div className="leftdiv"> Agent :  {this.state.AgentName}</div>
                            <div className="leftdiv">Company : {this.state.AgentComapny}</div>
                            <div className="leftdiv">Mobile# : {this.state.AgentMobile}</div>
                          </div>
                          <div className="col-sm-6">
                            <img src={this.state.AgentPic} className="myimagesmall" />
                          </div>


                        </div>
                      </div>
                    }



                    <div className="row">
                      <div className="col-sm-4 paragrpahNormaltext">Bedrooms : {this.state.selectedBedrooms}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Location : {this.state.selectedLocation}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Price :  {this.formatMoney(this.state.selectedPrice)}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 paragrpahNormaltext">FurnishedTyope : {this.state.selectedFurnitureType}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Type : {this.state.selectedType}</div>
                      <div className="col-sm-4 paragrpahNormaltext">parking : {this.state.selectedParking}</div>
                    </div>
                  </div>


                  <div className="col-sm-4 ">
                    <div className="row agentdivCss">
                      <div className="col-sm-6">
                        <div className="leftdiv"> Agent :  {this.state.AgentName}</div>
                        <div className="leftdiv">Company : {this.state.AgentComapny}</div>
                      </div>
                      <div className="col-sm-6">
                        <img src={this.state.AgentPic} className="myimagesmall" />
                      </div>


                    </div>
                    <div className="row">
                      <Message userEmail={this.state.selectedPropertyId} PropertyId={this.state.selectedPropertyId} />
                    </div>

                    <div className="row">

                      <div className="col-sm-4 zerpadding">
                        <div className="buttnemail" onClick={this.showmymapfunction.bind(this)} > {this.state.ButtonMapClose}</div>
                      </div>
                      <div className="col-sm-4 zerpadding">
                        <div className="myicondiv">
                          <div className="buttn" onClick={this.showmynumber.bind(this)} > Number</div>
                        </div>
                      </div>

                      <div className="col-sm-4 zerpadding">
                        <div >
                          <Heart isClick={this.state.isClick} onClick={this.setClick.bind(this)} />

                        </div>
                      </div>

                    </div>
                  </div>



                </div>


              </div>
            </div>
          }


        </div>
      </div>

    );
  }


}

export default withTranslation()(bodycards);
/*
render() {
    // const [] = useState(false);
    // const simgstr = "https://userfunctionsapi.blob.core.windows.net/myfiles/Screen%20Shot%202020-08-03%20at%202.13.13%20PM_1606884488004.png?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D";
    //const simgstr1 = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80"
    var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
      return (
        <div className="col-sm-3" key={item["key"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} >
          <Card style={{ width: '100%' }} className="bordershadow" key={item["typeofAccomodation"]}>
            <Card.Img height="220px" variant="top" src={item["Imagestr"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Type"]}</div>
                <div className="col-sm-12 paragraphcss">{item["propertyAddress"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Price"]}</div>

              </div>

              <div className="row">
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={calls} width="40px" height="39px" />
                  </div>
                </div>
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={whatsapp} width="50px" height="39px" />
                  </div>   </div>
                <div className="col-sm-4 zerpadding">
                  <div className="buttnemail" >Email</div>
                </div>
                <div className="col-sm-4 zerpadding">
                  <div className="myicondiv">
                    <div className="buttn" >Message</div>
                  </div>
                </div>

              </div>

            </Card.Body>
          </Card>
        </div>
      );
    });

    var AGentSubProjectArrays = this.state.AgentObjectArray.map((item, i) => {

      return (
        <div className="col-sm-3" key={item["key"]} onClick={this.getCarousalAgent.bind(this, item["PropertyId"])} >
          <Card style={{ width: '100%' }} className="bordershadow" key={item["typeofAccomodation"]}>
            <Card.Img height="220px" variant="top" src={item["Imagestr"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Type"]}</div>
                <div className="col-sm-12 paragraphcss">{item["propertyAddress"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Price"]}</div>

              </div>

              <div className="row">
                <div className="col-sm-3 zerpadding">
                  <div className="myicondiv">
                    <img src={calls} width="40px" />
                  </div>
                </div>
                <div className="col-sm-3 zerpadding">
                  <div className="myicondiv">
                    <img src={whatsapp} width="50px" />
                  </div>   </div>
                <div className="col-sm-3 zerpaddingEmail">
                  <img src={emailicon} width="39px" />


                </div>
                <div className="col-sm-3 zeroPaddingMessage">
                  <div className="myicondiv">
                    <img src={message} width="50px" />

                  </div>
                </div>

              </div>

            </Card.Body>
          </Card>
        </div>
      );
    });

    var SubProjectArrays2 = this.state.ObjectArrayTenant.map((item, i) => {
      return (<div className="mansearch" key={item["key"]}>
        <div className="col-sm-3 " >

          <Card style={{ width: '11rem' }} className="bordershadow" key={i} >
            <Card.Img height="120px" variant="top" src={item["Imagestr"]} />
            <Card.Body>

              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Area"]}</div>
                <div className="col-sm-12 paragraphcss">{item["age"]}Years</div>
              </div>
              <div className="row">
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faAtlas} />
                  </div>
                </div>
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>   </div>
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faCog} />
                  </div>
                </div>
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </div>
                </div>


              </div>

            </Card.Body>
          </Card>
        </div>
      </div>);
    });

    var carousalitem = null;
    carousalitem = this.state.carousalObjectitem.map((item, i) => {
      return (
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100"
            src={item.mypicstring} key={i}
            alt="First slide"
          />

        </Carousel.Item>






      );

    });


    if (this.state.ObjectArrayBids != null) {
      var SubProjectArrays3 = this.state.ObjectArrayBids.map((item, i) => {
        return (<div className="mansearch"  >
          <div className="col-sm-3 ">

            <Card style={{ width: '11rem' }} className="bordershadow" key={i} >
              <Card.Img height="120px" variant="top" src={item["productpic"]} />
              <Card.Body>

                <div className="row bottomborder" >
                  <div className="col-sm-12 paragraphcss">Dubai Marina</div>
                  <div className="col-sm-12 paragraphcss">Dubai Marina</div>
                </div>

                <div className="row">
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faAtlas} />
                    </div>
                  </div>
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>   </div>
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faCog} />
                    </div>
                  </div>
                  <div className="col-sm-3 paragraphcss">
                    <div className="myicondiv">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                  </div>


                </div>

              </Card.Body>
            </Card>
          </div>
        </div>);
      });
    }

    return (
      <div className="container-fluid">
        <div className="row" >
          {
            this.state.loader == true &&
            <div className="loader"></div>
          }
          {SubProjectArrays}
          {SubProjectArrays2}
          {SubProjectArrays3}
          {AGentSubProjectArrays}

        </div>
        <div>
          {
            this.state.ShowCarousal == true &&

            <div className="parentdiv">
              <div className="closebuttondi" onClick={this.CloseModal}>
                <FontAwesomeIcon icon={faTimes} /></div>

              <div className="carousaldiv">
                <div className="row">
                  <div className="col-sm-8 ">
                    <Carousel>
                      {carousalitem}
                    </Carousel>


                    {
                      this.state.showMyMap == 1 &&
                      <div className="carousaldiv2">
                        <GoogleMap />
                      </div>
                    }

                    {
                      this.state.ShowAnalytics == 1 &&
                      <div className="carousaldiv4">
                        <Propertyanalytics />
                      </div>
                    }


                    {
                      this.state.ShowAgentDetails == 1 &&
                      <div className="carousaldiv3">
                        <div className="closebuttondi2" onClick={this.CloseModalAgentDtails}>
                          <FontAwesomeIcon icon={faTimes} /></div>
                        <div className="row ">
                          <div className="col-sm-6">
                            <div className="leftdiv"> Agent :  {this.state.AgentName}</div>
                            <div className="leftdiv">Company : {this.state.AgentComapny}</div>
                            <div className="leftdiv">Mobile# : {this.state.AgentMobile}</div>
                          </div>
                          <div className="col-sm-6">
                            <img src={this.state.AgentPic} className="myimagesmall" />
                          </div>


                        </div>
                      </div>
                    }



                    <div className="row">
                      <div className="col-sm-4 paragrpahNormaltext">Bedrooms : {this.state.selectedBedrooms}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Location : {this.state.selectedLocation}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Price :  {this.formatMoney(this.state.selectedPrice)}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 paragrpahNormaltext">FurnishedTyope : {this.state.selectedFurnitureType}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Type : {this.state.selectedType}</div>
                      <div className="col-sm-4 paragrpahNormaltext">parking : {this.state.selectedParking}</div>
                    </div>
                  </div>


                  <div className="col-sm-4 ">
                    <div className="row agentdivCss">
                      <div className="col-sm-6">
                        <div className="leftdiv"> Agent :  {this.state.AgentName}</div>
                        <div className="leftdiv">Company : {this.state.AgentComapny}</div>
                      </div>
                      <div className="col-sm-6">
                        <img src={this.state.AgentPic} className="myimagesmall" />
                      </div>


                    </div>
                    <div className="row">
                      <Message userEmail={this.state.selectedPropertyId} PropertyId={this.state.selectedPropertyId} />
                    </div>

                    <div className="row">

                      <div className="col-sm-4 zerpadding">
                        <div className="buttnemail" onClick={this.showmymapfunction.bind(this)} > {this.state.ButtonMapClose}</div>
                      </div>
                      <div className="col-sm-4 zerpadding">
                        <div className="myicondiv">
                          <div className="buttn" onClick={this.showmynumber.bind(this)} > Number</div>
                        </div>
                      </div>

                      <div className="col-sm-4 zerpadding">
                        <div >
                          <Heart isClick={this.state.isClick} onClick={this.setClick.bind(this)} />

                        </div>
                      </div>

                    </div>
                  </div>



                </div>


              </div>
            </div>
          }


        </div>
      </div>

    );
  }


*/