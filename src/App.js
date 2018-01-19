import React, { Component } from 'react';
import './styles/App.css';
import key from './key';
import MyMap from './components/map';
import SidePanel from './components/sidepanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=${key}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: '70%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <SidePanel />
      </div>
    );
  }
}

export default App;
