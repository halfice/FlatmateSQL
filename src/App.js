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

import AgentProfile from './agentprofile';
import NearbyPlace from './nearbyplaces';
import ViewOffers from './Offers';


//view offers 101

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needwizard: 0,
      ownerwizard: 0,
      userid: 0,
      showcard: 1,
      BodyCardLoader: true,
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
          <Header handlerhome={this.handlerhome} userLoginId={this.state.userid} /></div>
        

        {this.state.needwizard == 0 && this.state.ownerwizard == 0 &&
            
            
            <div className=" row zeeomargin zerpadding">
           

            <div className="col-sm-10 zerpadding">
            <Rating handler={this.handler} />
          </div>

{ this.state.userid!=0 &&
          <div className="col-sm-2 ratingdiv2 zerpadding">
          <div className="offersdiv" onClick={this.handleoffers.bind(this)}> Offers </div>
          </div>
  }



          </div>
        }



        <br></br>
        {this.state.needwizard == 1000 &&
          <div className="row">
            <Register handleRegisnteredUserId={this.handleRegisnteredUserId} />
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
          <div className="row">
            <MainBodyCards handler={this.handler} />

            </div>
        }

        {
        this.state.needwizard == 1 &&
          <div className="col-sm-12">
            <Looking UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId}/>
            </div>
        }

        {
          this.state.needwizard == 3 &&
          <div className="col-sm-12">
            <RoomOwner UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId}/></div>
        }

        {
          this.state.needwizard == 4 &&
          <div className="col-sm-12">
            <Bids UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId}/>
          </div>

        }

{
          this.state.needwizard == 5 &&
          <div className="col-sm-12">
            <Property UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId}/>
          </div>

        }


{
          this.state.needwizard == 101 &&
          <div className="col-sm-12">
            <ViewOffers UserID={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId}/>
          </div>

        }





        {
          this.state.needwizard == 500 &&
          <div className="col-sm-12"><AgentProfile  userLoginId={this.state.userid} handleRegisnteredUserId={this.handleRegisnteredUserId}/>
          </div>

        }


        <div className="row">

          {
            this.state.showcard == 1 && this.state.needwizard != 3 && this.state.needwizard != 1 &&
            this.state.needwizard != 4 &&
            this.state.needwizard == 0 && this.state.needwizard != 1000 &&
              this.state.needwizard != 100 && this.state.needwizard != 1 &&
              this.state.needwizard != 500 && this.state.needwizard != 5 &&

            <div className="col-sm-12"><Bodycards /></div>

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



  handleoffers(){
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
  handleRegisnteredUserId = (useridfromdb) => {
   
    var myObject = JSON.stringify(useridfromdb.data);
    if (useridfromdb.data==undefined){
      myObject=useridfromdb;
    }


    console.log(myObject);
    var userid=myObject;
    this.setState({
      userid: userid,
      needwizard: 0,
      showcard: 1,

    })
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
}
export default withTranslation()(App);