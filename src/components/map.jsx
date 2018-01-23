import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/appActions';

import DrawingManager from './drawing-manager';

class MyMap extends React.Component {
  static contextTypes = { [MAP]: PropTypes.object };
  constructor(props) {
    super(props);
    this.google = window.google.maps;
  }

  componentDidMount() {
    this.props.fields.forEach((f) => this.createPoly(f));
  }

  componentWillReceiveProps(props) {
    const map = this.context[MAP];
    if (props.savingLocation && !this.props.savingLocation) {
      const c = map.getCenter();
      this.props.saveHomeLocation(c.lat(), c.lng(), map.getZoom());
    }
    if (props.focusingOnHome && !this.props.focusingOnHome) {
      const c = new this.google.LatLng(props.defaultCenter.lat, props.defaultCenter.lng);
      map.setCenter(c);
      map.setZoom(props.defaultZoom);
      this.props.focusOnHomeSuccess();
    }
  }

  getColor = (statusId) => {
    const status = this.props.statuses.find(s => s._id === statusId);
    return status ? status.color : '#000000';
  }

  select = (poly) => {
    if (!poly) {
      this.props.deselectPoly();
      return;
    }
    this.props.selectPoly(poly);
  }

  createPoly = (field) => {
    const latLngs = field.coords.map(c => new this.google.LatLng(c.lat, c.lng))
    const path = new this.google.MVCArray(latLngs);
    const options = {
      fillColor: this.getColor(field.status),
      paths: new this.google.MVCArray([path]),
      visible: true,
      map: this.context[MAP],
    };

    const poly = new this.google.Polygon(options);
    poly.addListener('click', () => {
      this.select(poly);
      this.props.selectField(field._id);
    });
  }

  onPolygonComplete = (poly) => {
    const id = (new Date()).toJSON();
    this.props.selectField(id);
    this.props.enableDrawing(false);
    poly.addListener('click', () => {
      this.select(poly);
      this.props.selectField(id);
    });
    this.select(poly);
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={this.props.defaultZoom} 
        defaultCenter={this.props.defaultCenter}
        mapTypeId="terrain"
      >
        {this.props.drawingEnabled ? <DrawingManager onPolygonComplete={this.onPolygonComplete}/> : null}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  selectedPoly: state.app.selectedPoly,
  drawingEnabled: state.app.drawingEnabled,
  selectedField: state.app.selectedField,
  isLoading: state.app.isLoading,
  defaultCenter: state.app.defaultCenter,
  defaultZoom: state.app.defaultZoom,
  savingLocation: state.app.savingLocation,
  focusingOnHome: state.app.focusingOnHome,
  fields: state.fields.items,
  statuses: state.fields.statuses,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(MyMap)));