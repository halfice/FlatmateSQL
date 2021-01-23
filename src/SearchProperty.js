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
import { transform } from 'async';
import message from './msgicon.jpg';
import emailicon from './emailicon.png'


library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

class SearchProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjectArray: [],

      loader: true,
      ImagesArray: [],
      ShowCarousal: false,
      blobtoken: "",
      myBlobs: [],
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",
      PropertyType: this.props.PropertyType,
      Location: this.props.Location,
      NoOfBedRooms: this.props.NoOfBedRooms,
      Furnished: this.props.Furnished,
      PriceMin: this.props.PriceMin,
      PriceMax: this.props.PriceMax,
      Statec: this.props.Statec,
      Deal: this.props.Deal,
      Feet: this.props.Feet,
      SeachBox: this.props.SeachBox,
      carousalObjectitem: [],


    }
    this.CloseModal = this.CloseModal.bind(this);


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

    });
  }


  async fetchpropertiesSearch() {
    var _Response = null;
    var TempUserProfileExisits = 0;
    var TempDivCounter = 0;
    var retrueneddata = [];
    var TempCarousalData = [];
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=search&PropertyType=" + this.state.PropertyType + "&Location=" + this.state.Location + " &NoOfBedRooms=" + this.state.NoOfBedRooms + " &Furnished=" + this.state.Furnished + "&PriceMin=" + this.state.PriceMin + "&PriceMax=" + this.state.PriceMax + "&Statec=" + this.state.Statec + " &Deal=" + this.state.Deal + "&Feet=" + this.state.Feet + " &SeachBox=" + this.state.SeachBox + "";
    try {
      let res = await axios.post(loginurl);
      console.log(res);
      var xcount = 10;
      for (var i = 0; i < res.data.recordset.length; i++) {
        xcount = xcount + 1;
        var obs = {
          'typeofAccomodation': res.data.recordset[i].Type,//.metadata.colName,
          'rent': res.data.recordset[i].Price,//metadata.colName,
          'totalbed': res.data.recordset[i].Bedrooms,//.metadata.colName,
          'propertyAddress': res.data.recordset[i].Location,//.metadata.colName,
          'Imagestr': this.state.imgstarturl + res.data.recordset[i].picstring + this.state.imgStartEnd,//.metadata.colName,
          'key': xcount,
          'Price': this.formatMoney(res.data.recordset[i].Price),
          'PropertyId': res.data.recordset[i].PropertyId,
        }
        retrueneddata.push(obs);
        var objectcarousal = {
          'AgentId': res.data.recordset[i].AgentId,
          'Bedrooms': res.data.recordset[i].Bedrooms,
          'Deal': res.data.recordset[i].Deal,
          'FurnishedTyope': res.data.recordset[i].FurnishedTyope,
          'Location': res.data.recordset[i].Location,
          'LoginUserID': res.data.recordset[i].LoginUserID,
          'Price': this.formatMoney(res.data.recordset[i].Price),
          'PropertyId': res.data.recordset[i].PropertyId,
          'State': res.data.recordset[i].State,
          'Type': res.data.recordset[i].Type,
          'internet': res.data.recordset[i].internet,
          'parking': res.data.recordset[i].parking,
          'picsstringone': res.data.recordset[i].picsstringone,
          'picsstringthree': res.data.recordset[i].picsstringthree,
          'picsstringtwo': res.data.recordset[i].picsstringtwo,
          'picstring': res.data.recordset[i].picstring,
          'totalbathrooms': res.data.recordset[i].totalbathrooms,
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
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
      return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

  handleSelect = (selectedIndex, e) => {

  };

  render() {
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
                    <img src={calls} width="40px" />
                  </div>
                </div>
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={whatsapp} width="50px" />
                  </div>
                </div>
                <div className="col-sm-4 zerpaddingEmail">
                  <img src={emailicon} width="39px" />

                </div>
                <div className="col-sm-4 zeroPaddingMessage">

                  <img src={message} width="50px" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      );
    });

    var carousalitem = null;
    carousalitem = this.state.carousalObjectitem.map((item, i) => {
      return (
        <Carousel.Item interval={1000}>
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
          {SubProjectArrays3}
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


                    <div className="row">
                      <div className="col-sm-4 paragrpahNormaltext">Bedrooms : {this.state.selectedBedrooms}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Location : {this.state.selectedLocation}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Price :{this.formatMoney(this.state.selectedPrice)}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 paragrpahNormaltext">FurnishedTyope : {this.state.selectedFurnitureType}</div>
                      <div className="col-sm-4 paragrpahNormaltext">Type : {this.state.selectedType}</div>
                      <div className="col-sm-4 paragrpahNormaltext">parking : {this.state.selectedParking}</div>
                    </div>
                  </div>

                  <div className="col-sm-4 ">

                    <div className="row">
                      <Message userEmail={this.state.selectedPropertyId} PropertyId={this.state.selectedPropertyId} />
                    </div>

                    <div className="row">

                      <div className="col-sm-4 zerpadding">
                        <div className="buttnemail" > Location</div>
                      </div>
                      <div className="col-sm-4 zerpadding">
                        <div className="myicondiv">
                          <div className="buttn" > Number</div>
                        </div>
                      </div>

                      <div className="col-sm-4 zerpadding">
                        <div className="myicondiv">
                          <div className="buttnemail" >ThumbsUp</div>
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

  async getblobtoken() {
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerStorageToken?code=TqfhfkL7Vgn0x/H7JHdqZQXTCzQZSMvAVcmKk2teC3ZOgTVSN3QYaA==";
    try {
      let res = await axios.post(loginurl);
      this.setState({
        blobtoken: res,
        loader: false,
      });
      // this.fetchblobs();
      this.fetchproperties();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.fetchpropertiesSearch();

  }

  CloseModal() {
    this.setState({
      ShowCarousal: false,
    });
  }






}
export default withTranslation()(SearchProperty);