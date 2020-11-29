import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import logoheader from './mainicon.gif';
import profilepic from './profile.png'
import { faTumblr, faTwitter } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import RangeSlider from 'react-bootstrap-range-slider';
import MyRange from './Range'
import BeautyStars from "beauty-stars";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faAtlas,
  faCheck,
  faBriefcase,
  faBackward,
  faHome,
  faCoffee,
  faQuoteLeft,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      userLoginId: this.props.userLoginId,
      rangevalue: 0,
      area: "",

    }
  }




  componentDidMount() {

  }
  shoonChangewsp() {
    this.setState({
      value: 4
    });
  }

  render() {
    return (

      <div className="container-fluid headermaindiv">
        <div className="row">
          <div className="col-sm-4">
            <div>
         </div></div>
          <div className="col-sm-4">
            <div className="mansearch">
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search mates / Property"></input>
              
            </div>
          </div>
          <div className="col-sm-4 hideonmobile">
            <div className="row">

              <div className="col-sm-2">
                <div onClick={() => this.props.handlerhome('0')} className="whitecolorcss" >
                  <FontAwesomeIcon icon={faHome} /></div></div>
              <div className="col-sm-2">                <div className="whitecolorcss">
                <FontAwesomeIcon icon={faCoffee} /></div> </div>
              <div className="col-sm-2">
                <div className="whitecolorcss"> <FontAwesomeIcon icon={faQuoteLeft} /></div>
              </div>
              <div className="col-sm-2">
                {
                  this.props.userLoginId != 0 &&
                  <div className="whitecolorcss">
                    <FontAwesomeIcon icon={faUser} onClick={() => this.props.handlerhome('500')} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>


        <div className="searchRow">

          <div className="col-md-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Property Type
  </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Rent</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Sale</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>




          </div>
          <div className="col-lg-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Location
  </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Marina</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Reem</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Al-Reef </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                BedRooms
  </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">2 </Dropdown.Item>
                <Dropdown.Item href="#/action-3">3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Funished
  </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Yes</Dropdown.Item>
                <Dropdown.Item href="#/action-3">No</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2">



            <input type="text" className="form-control" onChange={this.handlearea} placeholder="SQL FEET 0 - 999"></input>


          </div>

        </div>


        <div className="searchRow">

          <div className="col-md-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Price - Min
  </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Rent</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Sale</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>




          </div>
          <div className="col-lg-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Price - Max
  </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Marina</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Reem</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Al-Reef </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                State
  </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">2 </Dropdown.Item>
                <Dropdown.Item href="#/action-3">3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Deal - Hot / Cold
  </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Yes</Dropdown.Item>
                <Dropdown.Item href="#/action-3">No</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2">

            <div className="mainbutnd">
              <div className="innerbt">
                Let go
  </div>
            </div>



          </div>

        </div>
      </div>



    );
  }


  handlearea(event) {
    this.setState({
      area: event.target.value,
    });
  }

}