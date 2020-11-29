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
      name:'Al Fattan Marine Towers'
    },
    {name:'The Royal Oceanic'},
    {name:'Al Atina Twin Towers'},
    {name:'Paloma'},
    {name:'Al Majara 1'},
    {name:'Al Majara 2'},
    {name:'Al Majara 3'},
    {name:'Al Majara 4'},
  {name:'Al Majara 5'},
  {name:'Al Marsa Tower'},
  {name:'Al Sahab Tower 1'},
  {name:'Al Sahab Tower 2'},
  {name:'Al Seef Tower'},
  {name:'Emerald Residence'},
  {name:'Al Areifi Marina'},
  


  
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

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
      value: '',
      suggestions: []
    };
  }


  onChange = (event, { newValue }) => {
   //alert(newValue);
   this.props.handlerhomek(newValue)
    this.setState({
      value: newValue
    });
  };


  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


 


  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for the area.....',
      value,
      onChange: this.onChange,
      className:"form-control"
    };


   

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }


}



export default withTranslation()(Locationsuggest);
