import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sliding.css';

import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faAtlas,
  faCheck,
  faBriefcase,
  faBackward,
  faHome,
  faCoffee,
  faQuoteLeft

} from '@fortawesome/free-solid-svg-icons';
import Autosuggest from 'react-autosuggest';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },

  {
    name: 'Al Fattan Marine Towers',
    long: "54.672600",
    lat: "24.454165 ",
  },
  {
    name: 'The Royal Oceanic',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Atina Twin Towers',

    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Paloma',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Majara 1',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Majara 2',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Majara 3',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Majara 4',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Majara 5',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Marsa Tower',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Sahab Tower 1',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Sahab Tower 2',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Seef Tower',
    long: "54.672600",
    lagt: "24.454165"
  },
  {
    name: 'Emerald Residence',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Areifi Marina',
    long: "54.672600",
    lat: "24.454165"
  },

  {
    name: 'Al Reef Villas',
    long: "54.672600",
    lat: "24.454165"
  },
  {
    name: 'Al Reem Island',
    long: "54.672600",
    lat: "24.454165"
  },

];


const Cities =[
  {
    name: 'Abu Dhabi',
    long: "54.672600",
    lat: "24.454165 ",
  },
  {
    name: 'Dubai',
    long: "54.672600",
    lat: "24.454165 ",
  },

  {
    name: 'Sharjah',
    long: "54.672600",
    lat: "24.454165 ",
  },
  {
    name: 'Ajman',
    long: "54.672600",
    lat: "24.454165 ",
  },

  {
    name: 'RAK',
    long: "54.672600",
    lat: "24.454165 ",
  },

]

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};


const getSuggestionsCities =  valueCity => {
 //
  const inputValue =valueCity.trim().toLowerCase();

  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : Cities.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValueCity = CitySuggestion => CitySuggestion.name;
const getSuggestionValue = Suggestion => Suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);


export class Locationsuggest extends React.Component {
  constructor(props) {
    super(props);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: this.props.location,
      valueCity: this.props.valueCity,
      suggestions: [],
      CitySuggestion:[],
    };
  }


  onChange = (event, { newValue }) => {



    var tmpitem = languages.filter(properties => properties.name === newValue);
    if (tmpitem.length>0 &&  tmpitem!= null) {
     // alert(tmpitem[0].lagt);
      this.props.handlerhomek(this.state.valueCity, newValue,tmpitem[0].long,tmpitem[0].lat)
    }

      this.setState({
        value: newValue
      });
    };

    onChangeCity = (event, { newValue }) => {


      var tmpitem = Cities.filter(properties => properties.name === newValue);
      if (tmpitem.length>0 &&  tmpitem!= null) {
       // alert(tmpitem[0].lagt);
        this.props.handlerhomek(newValue,tmpitem[0].long,tmpitem[0].lat)
      }

        this.setState({
          valueCity: newValue
        });
      };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };


  onSuggestionsFetchRequestedCity = ({ valueCity }) => {


    this.setState({
      CitySuggestion: getSuggestionsCities(this.state.valueCity)

    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionsClearRequestedCity = () => {
    this.setState({
      CitySuggestion: []
    });
  };




  render() {
    const { value, suggestions } = this.state;
    const { valueCity, CitySuggestion } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for the area.....',
      value:value,
      onChange: this.onChange,
      className: "form-control"
    };


    const inputPropsCity = {
      placeholder: 'Search for the area.....',
      value :valueCity,
      onChange: this.onChangeCity,
      className: "form-control"
    };



    // Finally, render it!
    return (

      <div className="row">

      <div className="col-sm-12">
      <Autosuggest
        suggestions={CitySuggestion}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedCity}
        onSuggestionsClearRequested={this.onSuggestionsClearRequestedCity}
        getSuggestionValue={getSuggestionValueCity}
        renderSuggestion={renderSuggestion}
        inputProps={inputPropsCity}
      />
      </div>
      <div className="col-sm-12">
     <br></br>
      <Autosuggest
      id="roucecity"
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </div>
    </div>

    );
  }


}



export default withTranslation()(Locationsuggest);
