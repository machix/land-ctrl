import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import DrawingManager from './drawing-manager';
import { DEFAULT_COORDS } from '../util/constants';

class MyMap extends React.Component {
  static contextTypes = { [MAP]: PropTypes.object };
  constructor(props) {
    super(props);
    this.google = window.google.maps;
  }

  createPoly = (coords) => {
    const latLngs = coords.map(c => new this.google.LatLng(c.lat, c.lng))
    const path = new this.google.MVCArray(latLngs);
    const options = {
      fillColor: '#888',
      paths: new this.google.MVCArray([path]),
      visible: true,
      map: this.context[MAP],
    };
    return new this.google.Polygon(options);
  }

  onPolygonComplete = (poly) => {
    console.log('poly created')
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={8} 
        defaultCenter={DEFAULT_COORDS}
      >
        <DrawingManager onPolygonComplete={this.onPolygonComplete}/>
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MyMap));