import React, { Suspense, Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { Header } from "./header/header";
import Footer from "./footer/footer";
import Bodycards from "./bodycards";
import MainBodyCards from './MainBodyCards'
import { Rating } from "./rating";
import Looking from './lookingforroom';
import RoomOwner from './roomowner';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import LoginScreen from './screenlogin'
import Register from './screenregister'
import Profile from './Profile'
import Bids from './bids';
import Property from './property'
import axios from 'axios';

import AgentProfile from './agentprofile';
import NearbyPlace from './nearbyplaces';
import ViewOffers from './Offers';
import SearchProperty from './SearchProperty';
import Company from './companyregister';


//view offers 101

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needwizard: 597897987987897,
      ownerwizard: 0,
      userid: 0,
      showcard: 1,
      BodyCardLoader: true,
      PropertyType: "0",
      Location: "0",
      NoOfBedRooms: "0",
      Furnished: "0",
      PriceMin: "0",
      PriceMax: "0",
      Statec: "0",
      Deal: "0",
      Feet: "0",
      SeachBox: "0",
      AgentName: "",
      AgentPic: "",
      AgentMobile: "",
      AgentCompany: "",
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgstarturlprofiles: "https://userfunctionsapi.blob.core.windows.net/profilepics/",

      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",

      //fech properties agent
      GlobalObject: [],
      GlobalObjectCarousal: [],

      //fethc properties
      ObjectArray: [],
      carousalObject: [],
      finalArrayObject: [],

      compnayname: "",
      companylogo: "",

    }
  }

  render() {
    const { t } = this.props;
    let somthingNeedsTobe = "";
    let tagetedValue = 1;
    //when you want it to be rtl
    if (tagetedValue === 1) {
      somthingNeedsTobe = "rtl"
    } else {
      somthingNeedsTobe = "ltr"
    }

    return (
      <div className="App">
        <div className="">
          <Header handleSearchClick={this.handleSearchClick} handlerhome={this.handlerhome} userLoginId={this.state.userid} /></div>

        {this.state.needwizard == 0 && this.state.ownerwizard == 0 &&
          <div className=" row zeeomargin zerpadding">

            <div className="col-sm-10 zerpadding">
              <Rating handler={this.handler} />
            </div>

            {this.state.userid != 0 &&
              <div className="col-sm-2 ">
                <div className="mybuttons btn btn-primary" onClick={this.handleoffers.bind(this)}> Offers
                 </div>
              </div>
            }



          </div>
        }



        <br></br>
        {this.state.needwizard == 1000 &&
          <div className="row">
            <Register company={this.state.compnayname} companylogo={this.state.companylogo} handleRegisnteredUserId={this.handleRegisnteredUserId} handleRegisnteredUserIdtwo={this.handleRegisnteredUserIdtwo} />
          </div>
        }

        {this.state.needwizard == 1001 &&
          <div className="row">
            <Company handleRegisnteredUserIdCompany={this.handleRegisnteredUserIdCompany} handleRegisterUserScreen={this.handleRegisterUserScreen} />
          </div>
        }

        {this.state.needwizard == 100 &&
          <div className="row">
            <LoginScreen handlerRegister={this.handlerRegister} handleRegisnteredUserId={this.handleRegisnteredUserId} />
          </div>

        }

        {this.state.needwizard == 0 && this.state.needwizard != 1000 &&
          this.state.needwizard != 100 && this.state.needwizard != 1 &&
          this.state.needwizard != 500 && this.state.needwizard != 5 &&
          this.state.needwizard != 600 &&
          <div className="row">
            <MainBodyCards handler={this.handler} />

          </div>
        }

        {
          this.state.needwizard == 1 &&
          <div className="col-sm-12">
            <Looking UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId} />
          </div>
        }

        {
          this.state.needwizard == 3 &&
          <div className="col-sm-12">
            <RoomOwner UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId} /></div>
        }

        {
          this.state.needwizard == 4 &&
          <div className="col-sm-12">
            <Bids UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId} />
          </div>

        }

        {
          this.state.needwizard == 5 &&
          <div className="col-sm-12">
            <Property companylogo={this.state.companylogo} AgentName={this.state.AgentName} AgentComapny={this.state.AgentCompany} AgentMobile={this.state.AgentMobile} AgentPic={this.state.AgentPic} UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId} />
          </div>

        }


        {
          this.state.needwizard == 101 &&
          <div className="col-sm-12">
            <ViewOffers UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId} />
          </div>

        }

        {
          this.state.needwizard == 500 &&
          <div className="col-sm-12"><AgentProfile userLoginId={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId} />
          </div>
        }

        {
          this.state.needwizard == 600 &&
          <div className="col-sm-12">
            <SearchProperty
              PropertyType={this.state.PropertyType} Location={this.state.Location}
              NoOfBedRooms={this.state.NoOfBedRooms} Furnished={this.state.Furnished}
              PriceMin={this.state.PriceMin} PriceMax={this.state.PriceMax}
              Statec={this.state.Statec} Deal={this.state.Deal}
              Feet={this.state.Feet} SeachBox={this.state.SeachBox}
              SearchArray={this.state.ObjectArray}
              carousalObjectSearch={this.state.carousalObject}

            />
          </div>

        }


        <div className="row row2">

          {
            this.state.showcard == 1 && this.state.needwizard != 3 && this.state.needwizard != 1 &&
            this.state.needwizard != 4 &&
            this.state.needwizard == 0 && this.state.needwizard != 1000 &&
            this.state.needwizard != 100 && this.state.needwizard != 1 &&
            this.state.needwizard != 500 && this.state.needwizard != 5
            && this.state.needwizard != 600 &&

            <div className="row">
            <div className="col-sm-9">
              <Bodycards ObjectArray={this.state.ObjectArray} carousalObject={this.state.carousalObject} AgentName={this.state.AgentName} AgentcarousalObject={this.state.GlobalObjectCarousal} AgentObjectArray={this.state.GlobalObject} AgentComapny={this.state.AgentCompany} AgentMobile={this.state.AgentMobile} AgentPic={this.state.AgentPic} />
              </div>
              <div className="col-sm-3">
                <div>
<img src="https://www.omb.media/img/google-ads2.gif" />

                </div>
              </div>

              </div>
          }


          <div className="col-sm-12"><NearbyPlace /></div>




        </div>
        <div className="dontshow" >
          <p>{t('Thanks.1')}</p>  <p>{t('Why.1')}</p>
          {somthingNeedsTobe === "rtl" ?
            t('Position1') :
            t('Position2')
          }
          {somthingNeedsTobe === "rtl" ?
            //Load External Css A
            <></>
            :
            <></>
            //Load External Css B
          }

        </div>
        <div className="row"><Footer /></div>



      </div>
    )
  }

  handlerhome = (val) => {
    this.setState({
      needwizard: val,
      showcard: 1,
    })
  }

  handleoffers() {
    this.setState({
      needwizard: 101,

    })
  }

  handlerRegister = (val) => {
    this.setState({
      needwizard: val,
      showcard: 0,
    })
  }

  handleRegisnteredUserIdtwo = () => {
    this.setState({
      needwizard: 1001,
    })
  }

  handleRegisnteredUserIdCompany = (email, logo, company) => {
    this.setState({
      needwizard: 1000,
      compnayname: company,
      companylogo: logo
    })
  }

  handleRegisterUserScreen = () => {
    this.setState({
      needwizard: 1000,
      compnayname: "",
      companylogo: ""
    })
  }

  handleRegisnteredUserId = (useridfromdb, AgentMobile, agentPic, agentCompany, agentname, companylogo) => {
    var myObject = JSON.stringify(useridfromdb.data);
    if (useridfromdb.data == undefined) {
      myObject = useridfromdb;
    }
    console.log(myObject);
    var userid = myObject;
    this.setState({
      userid: userid,
      AgentMobile: AgentMobile,
      AgentPic: agentPic,
      needwizard: 0,
      showcard: 1,
      AgentCompany: agentCompany,
      AgentName: agentname,
      companylogo: companylogo

    });
  }

  handler = (val) => {

    var tmpuserchecking = 0;
    var tempval = val;
    var tmpshowcards = 1;
    if (this.state.userid == 0) {
      tempval = 100;
      tmpshowcards = 0;
    } else {
      tempval = val;
    }

    this.setState({
      needwizard: tempval,
      showcard: tmpshowcards,
    })
  }

  handlertwo = (val) => {

    var tmpuserchecking = 0;
    var tempval = val;
    var tmpshowcards = 1;
    if (this.state.userid == 0) {
      tempval = 100;
      tmpshowcards = 0;
    } else {
      tempval = val;
    }

    this.setState({
      ownerwizard: tempval,
      showcard: tmpshowcards,
    })
  }

  handleSearchClick = (PropertyType, Location, NoOfBedRooms, Furnished, PriceMin, PriceMax, Statec, Deal, Feet, SeachBox) => {
    //console.log(PropertyType,Location,NoOfBedRooms,Furnished,PriceMin,PriceMax,Statec,Deal,Feet,SeachBox);
    this.setState({
      needwizard: 0,
    });

    this.fetchpropertiesSearch(PropertyType, Location, NoOfBedRooms, Furnished, PriceMin, PriceMax, Statec, Deal, Feet, SeachBox);



  }

  componentDidMount() {
    this.fetchpropertiesagent();
    // this.fetchproperties();
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
      console.log("Agent" + res.data);
      var xcount = 10;
      if (res.data != "notfound") {
        for (var i = 0; i < res.data.length; i++) {
          xcount = xcount + 1;
          var obs = {
            'Imagestr': this.state.imgstarturl + res.data[i].picstring + this.state.imgStartEnd,//.metadata.colName,
            'key': xcount,
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
            'AgentNumber': res.data[i].AgentNumber,
            'AgentPic': res.data[i].AgentPic,
            'agentcompany': res.data[i].agentcompany,
            'agentname': res.data[i].agentname,
            'companylogo':this.state.imgstarturlprofiles + res.data[i].companylogo + this.state.imgStartEnd,







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
            'AgentNumber': res.data[i].AgentNumber,
            'AgentPic': res.data[i].AgentPic,
            'agentcompany': res.data[i].agentcompany,
            'agentname': res.data[i].agentname

          }
          TempCarousalData.push(objectcarousal);


        }
      }


      this.setState({
        GlobalObject: retrueneddata,
        GlobalObjectCarousal: TempCarousalData,
        loader: false,
        needwizard: 0,
      });

    } catch (error) {

    }
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

  async fetchpropertiesSearch(PropertyType, Location, NoOfBedRooms, Furnished, PriceMin, PriceMax, Statec, Deal, Feet, SeachBox) {
    var _Response = null;
    var TempUserProfileExisits = 0;
    var TempDivCounter = 0;
    var retrueneddata = [];
    var TempCarousalData = [];
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=search&PropertyType=" + PropertyType + "&Location=" + Location + " &NoOfBedRooms=" + this.state.NoOfBedRooms + " &Furnished=" + Furnished + "&PriceMin=" + this.state.PriceMin + "&PriceMax=" + this.state.PriceMax + "&Statec=" + Statec + " &Deal=" + this.state.Deal + "&Feet=" + Feet + " &SeachBox=" + SeachBox + "";
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
        needwizard: 600,
      });

    } catch (error) {

    }
  }
}
export default withTranslation()(App);