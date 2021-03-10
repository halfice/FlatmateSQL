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
import { faHeart, faCamera, faBed, faBath, faCog, faPhone, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faTimes, faParking, } from '@fortawesome/free-solid-svg-icons';
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
library.add(faBath, faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

class bodycardsTenants extends Component {
  constructor(props) {
    super(props);
    this.state = {

      TenantsArray: this.props.GlobalObjectTenants,


      loader: true,
      ImagesArray: [],
      ShowCarousal: false,
      blobtoken: "",
      myBlobs: [],
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",

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

      UserPanel:false,
      UserPanelItem:[],
      SelectedTenantId:"",

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




  CloseModalAgentDtails() {
    this.setState({
      ShowAgentDetails: 0,
      ButtonShownumber: "Number",
      UserPanel:false,
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




  getgetDetails(tenantid) {
    //UserPanel
    if (this.state.SelectedTenantId != 0) {
      // return;
    }
    this.setState({
      UserPanel: true,
      UserPanelItem:[],
    });
    var tmpitem = this.state.TenantsArray.filter(properties => properties.TenantId === tenantid);
    var TampCarousalItem = [];




  }


  formatMoney(num) {
    num = parseInt(num);
    var p = num.toFixed(2).split(".");
    return "AED" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
      return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
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



  render() {







    var TenantSubjectArray = this.state.TenantsArray.map((item, i) => {
      return (
        <div className="col-sm-6" key={item["key"]} onClick={this.getgetDetails.bind(this, item["TenantId"])} >
          <Card style={{ width: '100%' }} className="bordershadow" key={item["TenantId"]}>
            <Card.Img  variant="top" src={item["picstring"]} onClick={this.getgetDetails.bind(this, item["TenantId"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Area"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Rent"]}</div>
                <div className="col-sm-12 paragraphcss">{item["lifestyle"]}</div>

              </div>



            </Card.Body>
          </Card>
        </div>
      );
    });






    return (
      <div className="container-fluid">
        <div className="row" >
          {
            this.state.loader == true &&
            <div className="loader"></div>
          }

          {TenantSubjectArray}


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
                  ijiojoij


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

          {
            this.state.UserPanel == true &&
            <div className="parentdiv">
              <div className="closebuttondi" onClick={this.CloseModal}>
                <FontAwesomeIcon icon={faTimes} /></div>
            </div>

          }


        </div>
      </div>

    );
  }


}

export default withTranslation()(bodycardsTenants);
