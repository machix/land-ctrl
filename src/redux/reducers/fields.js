import store from '../store';
import db from '../db';

const fieldTable = db.table('fields');

const defaultState = {
  items: [],
  statuses: [
    {
      name: 'Uzarta',
      _id: '0',
    }, {
      name: 'Paseta',
      _id: '1',
    }, {
      name: 'Tuscia',
      _id: '2',
    }
  ],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_FIELD':
      return addField(state, action);
    case 'UPDATE_FIELD':
      return updateField(state, action);
    case 'DELETE_FIELD':
      return deleteField(state, action);
    case 'LOAD_FIELDS':
      return {
        ...state, 
        items: [ ...state.items, ...action.fields ],
      };
    default:
      return state;
  }
}

const addField = (state, action) => {
  changePolyColor(action.field.color);
  fieldTable.put({
    ...action.field,
    coords: getCoords(),
  });
  return {
    ...state,
    items: [ 
      ...state.items,
      action.field,
    ],
  };
}

const updateField = (state, action) => {
  const index = state.items.find(f => f._id === action.field._id);
  changePolyColor(action.field.color);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      action.field,
      ...state.items.slice(index + 1),
    ],
  };
};

const deleteField = (state, action) => {
  const index = state.items.find(f => f._id === action._id);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      ...state.items.slice(index + 1),
    ],
  };
};

const changePolyColor = (color) => {
  const poly = getPoly();
  if (poly) {
    poly.setOptions({ fillColor: color });
  }
}

const getPoly = () => store.getState().app.selectedPoly;

const getCoords = () => {
  const poly = getPoly();
  if (!poly) {
    return;
  }
  return poly
    .getPath()
    .getArray()
    .map(c => ({ lat: c.lat(), lng: c.lng() }));
}
