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
  faCog,faAtlas,faCheck,faBriefcase,faBackward,faHome,faCoffee,faQuoteLeft, faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyMaps from './MapContainer'

class NearbyPlaces extends Component {

  render() {
    return (
      <div className="container-fluid mt-2">
       
        <div>

        <div className="col-sm-12 card-body">
            <div onClick={() => this.props.handler('5')}> 
              <div className="" >
                <div className="row ">
                <div className="col-sm-2">
                    <div className="">
                  
                  </div>
                  
                  
                  </div>
                  <div className="col-sm-2">
                    <div className="mainbodyball1">
                  <img alt="" src={trolly}  className="imgclss"></img>
                  </div>
                  
                  
                  </div>

                  <div className="col-sm-2">
                  <div className="mainbodyball2">
                  <img alt="" src={cult}  className="imgclss"></img>
                  </div>
                  </div>


                  <div className="col-sm-2">
                  <div className="mainbodyball3">
                  <img alt="" src={beds} className="imgclss"  ></img>
                  </div>
                  </div>


                  <div className="col-sm-2">
                  <div className="mainbodyball4">
                  <img alt="" src={bins}  className="imgclss"></img>
                  </div>
                  </div>

                  <div className="col-sm-2">
                  <div className="">
                 
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







export default NearbyPlaces;