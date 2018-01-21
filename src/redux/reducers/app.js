import db from '../db';
import { DEFAULT_COORDS, SELECTED_COLOR } from '../../util/constants';

const appTable = db.table('app');

const defaultState = {
  selectedField: null,
  selectedPoly: null,
  showFieldInfo: false,
  drawingEnabled: false,
  isLoading: true,
  savingLocation: false,
  focusingOnHome: false,
  defaultCenter: DEFAULT_COORDS,
  defaultZoom: 8,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SELECT_FIELD':
      return {
        ...state,
        selectedField: action.id,
        showFieldInfo: true,
      };
    case 'HIDE_FIELD_INFO':
      return {
        ...state,
        selectedField: null,
        showFieldInfo: false,
      };
    case 'REMOVE_SELECTED_POLY':
      return removeSelectedPoly(state);
    case 'SELECT_POLY':
      return selectPoly(state, action);
    case 'DESELECT_POLY':
      return deselectPoly(state);
    case 'TOGGLE_DRAWING':
      return { 
        ...state,
        drawingEnabled: action.enabled,
      };
    case 'LOADING_STOP':
      return { ...state, isLoading: false };
    case 'SAVE_HOME_LOCATION':
      return saveHomeLocation(state, action);
    case 'FOCUS_ON_HOME':
      return { ...state, focusingOnHome: true};
    case 'FOCUS_ON_HOME_SUCCESS':
      return { ...state, focusingOnHome: false};
    case 'LOAD_SETTINGS':
      return loadSettings(state, action);
    default:
      return state;
  }
}

const selectPoly = (state, action) => {
  deselectPoly(state);
  action.poly.setOptions({ strokeColor: SELECTED_COLOR });
  return { ...state, selectedPoly: action.poly };
}

const deselectPoly = (state) => {
  if (state.selectedPoly) {
    state.selectedPoly.setOptions({ strokeColor: 'black' });
  }
  return { ...state, selectedPoly: null };
}

const removeSelectedPoly = (state) => {
  if (state.selectedPoly) {
    state.selectedPoly.setMap(null);
  }
  return { ...state, selectedPoly: null };
}

const saveHomeLocation = (state, action) => {
  if (!action.lat || !action.lng || !action.zoom) {
    return {
      ...state,
      savingLocation: true,
    };
  }
  const settingsObj = {
    _id: 'settings',
    defaultCenter: { lat: action.lat, lng: action.lng },
    defaultZoom: action.zoom,
  };
  appTable
    .get('settings')
    .then((res) => appTable.put({ ...settingsObj, _rev: res._rev }))
    .catch(e => {
      if (e.status === 404) {
        appTable.put(settingsObj)
      }
    });
  return {
    ...state,
    savingLocation: false,
    defaultCenter: { lat: action.lat, lng: action.lng },
    defaultZoom: action.zoom,
  }
}

const loadSettings = (state, action) => {
  return {
    defaultCenter: action.defaultCenter,
    defaultZoom: action.defaultZoom,
  };
}