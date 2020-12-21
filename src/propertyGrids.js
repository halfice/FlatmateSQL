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
import { faCog, faPhone, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faTimes, } from '@fortawesome/free-solid-svg-icons';
import gmails from './gmail.gif';
import whatsapp from './whatsapp.gif';
import calls from './call.gif';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from './Message'

library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

class PropertyGrids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjectArray: [],
      ObjectArrayTenant: [],
      ObjectArrayBids: [],
      loader: true,
      ImagesArray: [],
      ShowCarousal: false,
      blobtoken: "",
      myBlobs: [],
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",
     
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


    }
    this.CloseModal = this.CloseModal.bind(this);


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
          'Price': res.data[i].Price,
          'PropertyId': res.data[i].PropertyId,
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

  handleSelect = (selectedIndex, e) => {

  };

  render() {



   
   
    var PropertyGrids = this.state.ObjectArray.map((item, i) => {
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
                    <img src={calls} width="40px" />
                  </div>
                </div>
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={whatsapp} width="50px" />
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



  
   







    return (
      <div className="container-fluid">
        <div className="row" >
          {
            this.state.loader == true &&
            <div className="loader"></div>
          }
          {PropertyGrids}
          


        </div>
       
      </div>

    );
  }

  

  componentDidMount() {
    this.fetchproperties();

  }

}

export default withTranslation()(PropertyGrids);