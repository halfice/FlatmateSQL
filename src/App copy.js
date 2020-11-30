/*

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needwizard: 1,
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
          <div className="">
            <Rating handler={this.handler} />
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

        {this.state.needwizard == 0 &&
          <div className="row">
            <MainBodyCards handler={this.handler} />
            </div>
        }

        {
        this.state.needwizard == 1 &&
          <div className="col-sm-12">
            <Looking UserID={this.state.userid} />
            </div>
        }

        {
          this.state.needwizard == 3 &&
          <div className="col-sm-12">
            <RoomOwner UserID={this.state.userid} /></div>
        }

        {
          this.state.needwizard == 4 &&
          <div className="col-sm-12">
            <Bids UserID={this.state.userid} />
          </div>

        }

{
          this.state.needwizard == 5 &&
          <div className="col-sm-12">
            <Property UserID={this.state.userid} />
          </div>

        }
        {
          this.state.needwizard == 500 &&
          <div className="col-sm-12"><Profile UserID={this.state.userid} />
          </div>

        }


        <div className="row">

          {
            this.state.showcard == 1 && this.state.needwizard != 3 && this.state.needwizard != 1 &&
            this.state.needwizard != 4 &&

            <div className="col-sm-12"><Bodycards /></div>

          }



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


---------
Main _body card Backup 

Start 
import React, { Suspense, Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import innedflatmate from './ineedflatmate.jpg';
import innedflavtmate from './images.jpg';
import { Switch, Router, Route, IndexRoute, useRouterHistory } from 'react-router';


class MainBodyCards extends Component {

  render() {
    return (
      <div className="container-fluid mt-2">
        <div className="row mt-2">
        <div className="col-sm-4 card-body">
            <div >
              <div className="bottombordr" >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row marginljeft">
                      <span className="spanclasstext">I nEED</span>
                    </div>
                    <div className="row marginleft">
                      <p>Share your potential findings.
                      </p>
                    </div>
                    <div className="container row marginljeft">
                  
  
  
                      <Button className="mybuttons"  onClick = {() => this.props.handler('1')}>Wizard</Button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <img src={innedflavtmate} className="imageclassheader" />
                    </div>
                  </div>
                </div>
  
              </div>
  
  
            </div>
  
  
          </div>
          <div className="col-sm-3 hideid">
          <div >
              <div className="bottombordr" >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row marginljeft">
                      <span className="spanclasstext">I hAVE</span>
                    </div>
                    <div className="row marginleft">
                      <p>Share your potential property.
  
                      </p>
                    </div>
                    <div className="container row marginljeft">
                    <Button className="mybuttons" onClick = {() => this.props.handler('3')}>Wizard</Button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <img src={innedflavtmate} className="imageclassheader" />
                    </div>
                  </div>
                </div>
  
              </div>
  
  
            </div>

          </div>
          <div className="col-sm-3 hideid">
          <div >
              <div className="bottombordr" >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row marginljeft">
                      <span className="spanclasstext">I Sell</span>
                    </div>
                    <div className="row marginleft">
                      <p>Shelve your potential property.
  
                      </p>
                    </div>
                    <div className="container row marginljeft">
                    <Button className="mybuttons" onClick = {() => this.props.handler('4')}>Wizard</Button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <img src={innedflavtmate} className="imageclassheader" />
                    </div>
                  </div>
                </div>
  
              </div>
  
  
            </div>
  
  
  
  
          </div>
          <div className="col-sm-4 card-body">
          <div >
              <div className="bottombordr" >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row marginljeft">
                      <span className="spanclasstext">Property</span>
                    </div>
                    <div className="row marginleft">
                      <p>Add your Potentital Property.
  
                      </p>
                    </div>
                    <div className="container row marginljeft">
                    <Button className="mybuttons" onClick = {() => this.props.handler('5')}>Wizard</Button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <img src={innedflavtmate} className="imageclassheader" />
                    </div>
                  </div>
                </div>
  
              </div>
  
  
            </div>
  
  
  
  
          </div>
          
        </div>
  
  
  
  
  
  
  
  
      </div>
  
  
    );
  }

}







export default MainBodyCards;
end

*/