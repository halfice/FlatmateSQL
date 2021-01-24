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
      PropertyType: "",
      Location: "",
      NoOfBedRooms: "",
      Furnished: "",
      PriceMin: "",
      PriceMax: "",
      Statec: "",
      Deal: "",
      Feet: "",
      SeachBox: "",
      Purpose:"",



      selectedOptionPropertyType: "",
      selectedOptionLocation: "",
      selectedOptionNoOfBedRooms: "",
      selectedOptionFurnished: "",
      selectedOptionPriceMin: "",
      selectedOptionPriceMax: "",
      selectedOptionStatec: "",
      selectedOptionDeal: "",
      Feet: "",
      SeachBox: "",
      selectedOptionPurpose:"",
      







    }

    this.handMainSearch = this.handMainSearch.bind(this);
    this.handlearea = this.handlearea.bind(this);


  }



  handMainSearch(event) {
    this.setState({
      SeachBox: event.target.value
    });
  }

  handlearea(event) {
    this.setState({
      Feet: event.target.value
    });
  }


  handlePropertyType = selectedOptionPropertyType => {
    this.setState(
      {
        selectedOptionPropertyType,
        PropertyType: selectedOptionPropertyType.label
      });

  };


  handlePropertyTypePurppose = selectedOptionPurpose => {
    this.setState(
      {
        selectedOptionPurpose,
        Purpose: selectedOptionPurpose.label
      });

  };

  handleLocation = selectedOptionLocation => {
    this.setState(
      {
        selectedOptionLocation,
        Location: selectedOptionLocation.label
      });

  };

  handleNoOfBedRooms = selectedOptionNoOfBedRooms => {
    this.setState(
      {
        selectedOptionNoOfBedRooms,
        NoOfBedRooms: selectedOptionNoOfBedRooms.label
      });

  };

  handleFurnished = selectedOptionFurnished => {
    this.setState(
      {
        selectedOptionFurnished,
        Furnished: selectedOptionFurnished.label
      });

  };

  handlePriceMin = selectedOptionPriceMin => {
    this.setState(
      {
        selectedOptionPriceMin,
        PriceMin: selectedOptionPriceMin.label
      });

  };

  handlePriceMax = selectedOptionPriceMax => {
    this.setState(
      {
        selectedOptionPriceMax,
        PriceMax: selectedOptionPriceMax.label
      });

  };

  handleStatec = selectedOptionStatec => {
    this.setState(
      {
        selectedOptionStatec,
        Statec: selectedOptionStatec.label
      });

  };

  handleDeal = selectedOptionDeal => {
    this.setState(
      {
        selectedOptionDeal,
        Deal: selectedOptionDeal.label
      });

  };


  componentDidMount() {

  }
  shoonChangewsp() {
    this.setState({
      value: 4
    });
  }

  render() {

    const optionPurpose = [
      { value: 'Rent', label: 'Rent' },
      { value: 'Buy', label: 'Buy' },
    ];


    const optionsLocation = [


      { value: 'Al-Reef', label: 'Al-Reef' },
      { value: 'Sadiyat', label: 'Sadiyat' },
      { value: 'Al-Reem', label: 'Al-Reem' },
    ];


    const optionsNoOfBedRooms = [
      { value: 'Studio', label: 'Studio' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
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

const optionsPropertyType=[
  { value: 'Villa', label: 'Villa' },
  { value: 'Appartment', label: 'Appartment' },
  { value: 'Office', label: 'Office' },
]





    return (

      <div className="container-fluid headermaindiv">
        <div className="row">
          <div className="col-sm-4">
            <div>
            </div></div>
          <div className="col-sm-4">
            <div className="mansearch">
              <input type="email" className="form-control texboscsssearch" onChange={this.handMainSearch} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search mates / Property"></input>

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
                <div className="whitecolorcss"> 
                <FontAwesomeIcon icon={faQuoteLeft} /></div>
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

        <div className="col-lg-2">
            <Select
              value={this.state.selectedOptionStatec}
              onChange={this.handleStatec}
              options={optionsState}
              className="dropdowng"
              placeholder="Your State"
            />
          </div>

          <div className="col-md-2">
  <Select
              value={this.state.selectedOptionPurpose}
              onChange={this.handlePropertyTypePurppose}
              options={optionPurpose}
              className="dropdowng"
              placeholder="Purpose..."
            />

          </div>
          <div className="col-md-2">
  <Select
              value={this.state.selectedOptionPropertyType}
              onChange={this.handlePropertyType}
              options={optionsPropertyType}
              className="dropdowng"
              placeholder="Select Property Type"
            />

          </div>


          <div className="col-lg-3">
            <Select
              value={this.state.selectedOptionLocation}
              onChange={this.handleLocation}
              options={optionsLocation}
              className="dropdowng"
              placeholder="Select Location"
            />

          </div>
       
          <div className="col-lg-2">

            <input type="text" className="form-control" onChange={this.handlearea} placeholder="SQL FEET 0 - 999"></input>


          </div>

        </div>


        <div className="searchRow">

          <div className="col-md-2">
            <Select
              value={this.state.selectedOptionPriceMin}
              onChange={this.handlePriceMin}
              options={optionsPriceMin}
              className="dropdowng"
              placeholder="Min-Price i.e. 10K"
            />




          </div>
          <div className="col-lg-2">
            <Select
              value={this.state.selectedOptionPriceMax}
              onChange={this.handlePriceMax}
              options={optionsPriceMax}
              className="dropdowng"
              placeholder="Max Price i.e. 1Million"
            />
          </div>
          <div className="col-lg-2">
            <Select
              value={this.state.selectedOptionNoOfBedRooms}
              onChange={this.handleNoOfBedRooms}
              options={optionsNoOfBedRooms}
              className="dropdowng"
              placeholder="Room"
            />
          </div>
          



          
          <div className="col-lg-3">
            <Select
              value={this.state.selectedOptionDeal}
              onChange={this.handleDeal}
              options={optionsDeal}
              className="dropdowng"
              placeholder="Hot?"
            />
          </div>
          <div className="col-lg-2">

            <div className="mybuttons btn btn-primary" onClick={() => this.props.handleSearchClick(this.state.PropertyType, this.state.Location, this.state.NoOfBedRooms,
              this.state.Furnished, this.state.PriceMin, this.state.PriceMax, this.state.Statec,
              this.state.Deal, this.state.Feet, this.state.SeachBox)}>
              <div className="innerbt">
                Let go
  </div>
            </div>



          </div>

        </div>
      </div>



    );
  }




}