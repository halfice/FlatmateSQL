import React, { Suspense, Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import innedflatmate from './ineedflatmate.jpg';
import innedflavtmate from './images.jpg';
import trolly from './trolly.png';
import cult from './cult.png';
import beds from './beds.png';
import bins from './bins.png';

import { Switch, Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import {
  faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyMaps from './MapContainer'
class MainBodyCards extends Component {

  render() {
    return (
      <div className="container-fluid mt-2">
        <div className="row mt-2">
          <div className="col-sm-2 card-body"></div>



          <div className="col-sm-3 card-body">
            <div onClick={() => this.props.handler('5')}>
              <div className="bottombordr" >
                <div className="row bcimage">
                  <div className="col-sm-12">
                    <div className="row marginljeft">
                      <span className="spanclasstext">Share Property</span>
                    </div>
                    <div className="row marginleft">

                    </div>
                    <div className="container row marginljeft">
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      {
                        //                      <FontAwesomeIcon icon={faHome} className="homeicon" />

                      }
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
          <div className="col-sm-2 card-body"></div>



        </div>


      </div>


    );
  }

}







export default MainBodyCards;


/**
 *
 *   <div className="col-sm-3 card-body">
            <div onClick={() => this.props.handler('1')} >
              <div className="bottombordr" >
                <div className="row bcimagep">
                  <div className="col-sm-12">
                    <div className="row marginljeft">
                      <span className="spanclasstext">Share Flatmate</span>
                    </div>
                    <div className="row marginleft">

                    </div>
                    <div className="container row marginljeft">



                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div>
                      {
//                    <FontAwesomeIcon icon={faCoffee} className="homeicon"/>


                      }
                      </div>
                  </div>
                </div>

              </div>


            </div>
          </div>
 *
 *
 */