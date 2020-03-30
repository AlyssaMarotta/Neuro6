import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css'
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 29.639428,
      lng: -82.341238
    },
    zoom: 15
  };
 
  render() {
    return (
      <div style={{ height: '400px', width: '40%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDBa6zDWNZyeAGZRbMb6F1gyYNgsd2_gUw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={29.639428}
            lng={-82.341238}
            text="UF Neurosurgery"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;