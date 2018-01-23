import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import db from './redux/db';
import './styles/App.css';
import { GOOGLE_URL } from './util/constants';
import MyMap from './components/map';
import SidePanel from './components/sidepanel';

class App extends Component {
  constructor() {
    super();

    this.unsub = store.subscribe(() => {
      if (!store.getState().app.isLoading) {
        this.setState({ isLoading: false });
        this.unsub();
      }
    });

    this.state = {
      isLoading: store.getState().app.isLoading,
    };
  }

  render() {
    return this.state.isLoading ? 
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
      :
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
      </Provider>;
  }
}

export default App;

// INITIALIZE ----------
const loadFields = () => db
  .getAllDocs('fields')
  .then((res) => {
    const fields = res.rows.map(r => r.doc);
    store.dispatch({
      type: 'LOAD_FIELDS',
      fields,
    });
  });

const loadStatuses = () => db
  .getAllDocs('statuses')
  .then((res) => {
    store.dispatch({
      type: 'LOAD_STATUSES',
      statuses: res.rows.map(s => s.doc),
    });
  });

const loadSettings = () => db
  .table('app')
  .get('settings')
  .then((res) => {
    store.dispatch({
      type: 'LOAD_SETTINGS',
      defaultCenter: res.defaultCenter,
      defaultZoom: res.defaultZoom,
    });
  });

loadSettings()
  .then(loadStatuses)
  .then(loadFields)
  .then(() => {
    store.dispatch({ type: 'LOADING_STOP' });
  })
// ---------------------
