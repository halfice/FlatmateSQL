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
        
        <div className="col-sm-3">
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
          <div className="col-sm-3">
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

          <div className="col-sm-3">
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



          <div className="col-sm-3">
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
          
        </div>
  
  
  
  
  
  
  
  
      </div>
  
  
    );
  }

}







export default MainBodyCards;