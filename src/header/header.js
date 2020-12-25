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
import Select from 'react-select';

library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      userLoginId: this.props.userLoginId,
      rangevalue: 0,
      area: "",
      PropertyType:"",
      Location:"",
      NoOfBedRooms:"",
      Furnished:"",
      PriceMin:"",
      PriceMax:"",
      Statec:"",
      Deal:"",

    }
  }

  handlePropertyType = selectedOption => {
    this.setState(
      { selectedOption,
        PropertyType:selectedOption.label });
    
  };

  handleLocation = selectedOption => {
    this.setState(
      { selectedOption,
        Location:selectedOption.label });
    
  };

  handleNoOfBedRooms = selectedOption => {
    this.setState(
      { selectedOption,
        NoOfBedRooms:selectedOption.label });
    
  };

  handleFurnished = selectedOption => {
    this.setState(
      { selectedOption,
        Furnished:selectedOption.label });
    
  };

  handlePriceMin = selectedOption => {
    this.setState(
      { selectedOption,
        PriceMin:selectedOption.label });
    
  };

  handlePriceMax = selectedOption => {
    this.setState(
      { selectedOption,
        PriceMax:selectedOption.label });
    
  };

  handleStatec = selectedOption => {
    this.setState(
      { selectedOption,
        Statec:selectedOption.label });
    
  };

  handleDeal = selectedOption => {
    this.setState(
      { selectedOption,
        Deal:selectedOption.label });
    
  };

  handleSearchClient(){
    alert("D");
  }

  




  componentDidMount() {

  }
  shoonChangewsp() {
    this.setState({
      value: 4
    });
  }

  render() {

    const optionsPropertyType = [
      { value: 'Rent', label: 'Rent' },
      { value: 'Sale', label: 'Sale' },
    ];


    const optionsLocation = [
      { value: 'Marina', label: 'Marina' },
      { value: 'Al-Reef', label: 'Al-Reef' },
      { value: 'Sadiyat', label: 'Sadiyat' },
    ];
    

    const optionsNoOfBedRooms = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '2' },
      { value: '4', label: '2' },
      { value: '5', label: '2' },
      { value: '6', label: '2' },
      { value: '7', label: '2' },
    ];

    const optionsFurnished = [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ];

    const optionsPriceMin = [
      { value: '1M', label: '1M' },
      { value: '200K', label: '200K' },
      { value: '300K', label: '300K' },
      { value: '400K', label: '400K' },
      { value: '500K', label: '500K' },
      { value: '2M', label: '2M' },
    ];

    const optionsPriceMax = [
      { value: '1M', label: '1M' },
      { value: '200K', label: '200K' },
      { value: '300K', label: '300K' },
      { value: '400K', label: '400K' },
      { value: '500K', label: '500K' },
      { value: '2M', label: '2M' },
      { value: '3M', label: '3M' },
      { value: '4M', label: '4M' },
    ];

    const optionsState = [
      { value: 'AbuDhabi', label: 'AbuDhabi' },
      { value: 'Al-Ain', label: 'Al-Ain' },
    ];

    const optionsDeal = [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ];

  
    
    



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

          <Select
        value={this.state.PropertyType}
        onChange={this.handlePropertyType}
        options={optionsPropertyType}
        className="dropdowng"
      />

        



          </div>
          <div className="col-lg-3">
          <Select
        value={this.state.Location}
        onChange={this.handleLocation}
        options={optionsLocation}
        className="dropdowng"
      />

          </div>
          <div className="col-lg-2">
          <Select
        value={this.state.NoOfBedRooms}
        onChange={this.handleNoOfBedRooms}
        options={optionsNoOfBedRooms}
        className="dropdowng"
      />
          </div>
          <div className="col-lg-2">
          <Select
        value={this.state.Furnished}
        onChange={this.handleFurnished}
        options={optionsFurnished}
        className="dropdowng"
      />
          </div>
          <div className="col-lg-2">



            <input type="text" className="form-control" onChange={this.handlearea} placeholder="SQL FEET 0 - 999"></input>


          </div>

        </div>


        <div className="searchRow">

          <div className="col-md-2">
          <Select
        value={this.state.PriceMin}
        onChange={this.handlePriceMin}
        options={optionsPriceMin}
        className="dropdowng"
      />




          </div>
          <div className="col-lg-3">
          <Select
        value={this.state.PriceMax}
        onChange={this.handlePriceMax}
        options={optionsPriceMax}
        className="dropdowng"
      />
          </div>
          <div className="col-lg-2">
          <Select
        value={this.state.Statec}
        onChange={this.handleStatec}
        options={optionsState}
        className="dropdowng"
      />
          </div>
          <div className="col-lg-2">
          <Select
        value={this.state.Deal}
        onChange={this.handleDeal}
        options={optionsDeal}
        className="dropdowng"
      />
          </div>
          <div className="col-lg-2">

            <div className="mybuttons btn btn-primary" onClick={this.handleSearchClient}>
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