import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import DrawingManager from './drawing-manager';
import InfoBox from './info-box';
import { DEFAULT_COORDS } from '../util/constants';

class MyMap extends React.Component {
  static contextTypes = { [MAP]: PropTypes.object };
  constructor(props) {
    super(props);
    this.google = window.google.maps;
    this.state = {
      infoBoxCoords: new this.google.LatLng(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng),
      infoBoxVisible: false,
    };
  }

  createPoly = (coords) => {
    const latLngs = coords.map(c => new window.google.maps.LatLng(c.lat, c.lng))
    const path = new window.google.maps.MVCArray(latLngs);
    const options = {
      fillColor: '#888',
      paths: new window.google.maps.MVCArray([path]),
      visible: true,
      map: this.context[MAP],
    };
    return new window.google.maps.Polygon(options);
  }

  onPolygonComplete = (poly) => {
    const bounds = new this.google.LatLngBounds();
    poly.getPath().forEach(coord => bounds.extend(coord));
    this.setState({
      infoBoxCoords: bounds.getCenter(),
      infoBoxVisible: true,
    });
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={8} 
        defaultCenter={DEFAULT_COORDS}
      >
        <InfoBox
          position={this.state.infoBoxCoords}
          visible={this.state.infoBoxVisible}
        />
        <DrawingManager onPolygonComplete={this.onPolygonComplete}/>
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MyMap));