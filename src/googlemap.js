import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 24.4539,
      lng: 54.3773
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '77vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyATQ-64ihY1pYxIxj4mTkDJlHgZC-sEbdM` }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={24.4539}
            lng={54.3773}
            text="Abudhabi"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;