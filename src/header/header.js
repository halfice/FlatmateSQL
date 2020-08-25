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
import logoder from './axix.png';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr, faTwitter } from '@fortawesome/free-solid-svg-icons'
import {
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import BeautyStars from "beauty-stars";

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      userLoginId:this.props.userLoginId,
    }
  }
  componentDidMount()
  {

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
              <img src={logoheader} />
            </div></div>
          <div className="col-sm-4 hideonmobile"><div className="mansearch">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search mates"></input>

          </div></div>

          <div className="col-sm-4 hideonmobile">
            <div className="row">

              <div className="col-sm-2">  <div onClick={() => this.props.handlerhome('0')} className="whitecolorcss" > <FontAwesomeIcon icon={faHome} /></div></div>
              <div className="col-sm-2">                <div className="whitecolorcss">
                 <FontAwesomeIcon icon={faCoffee} /></div> </div>
              <div className="col-sm-2">
                <div className="whitecolorcss"> <FontAwesomeIcon icon={faQuoteLeft} /></div>
              </div>
              <div className="col-sm-2">
               
                {
                this.props.userLoginId !=0 &&
                <div className="whitecolorcss"> 
<FontAwesomeIcon icon={faUser} onClick={() => this.props.handlerhome('500')}/>
   </div>

}
                
               
              </div>
              <div className="col-sm-4">
                


           </div>



            </div>

          </div>
        </div>
      </div>



    );
  }

}

