import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/App.css';
import { GOOGLE_URL } from './util/constants';
import MyMap from './components/map';
import SidePanel from './components/sidepanel';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MyMap 
            googleMapURL={GOOGLE_URL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%`, width: '70%' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          <SidePanel />
        </div>
      </Provider>
    );
  }
}

export default App;
