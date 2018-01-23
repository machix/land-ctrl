import store from '../store';
import db from '../db';
import { updateField as updateRev } from '../actions/fieldsActions';

const fieldTable = db.table('fields');
const statusTable = db.table('statuses');

const defaultState = {
  items: [],
  statuses: [
    {
      name: 'Tuscia',
      color: '#000000',
      _id: 'default_status',
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
    case 'ADD_STATUS':
      return addStatus(state, action);
    case 'LOAD_STATUSES':
      return loadStatuses(state, action);
    default:
      return state;
  }
}

const addField = (state, action) => {
  changePolyColor(action.field.status, state);
  const field = {
    ...action.field,
    coords: getCoords(),
  };
  fieldTable.put(field).then((res) => {
    store.dispatch(updateRev(
      {...field, _rev: res.rev},
      true,
    ));
  });
  return {
    ...state,
    items: [ 
      ...state.items,
      field,
    ],
  };
}

const updateField = (state, action) => {
  const index = state.items.findIndex(f => f._id === action.field._id);
  changePolyColor(action.field.status, state);
  if (!action.dontSaveToDb) {
    fieldTable.put({
      ...action.field,
    })
    .catch(e => console.log(e))
  }
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
  const index = state.items.findIndex(f => f._id === action.id);
  fieldTable.remove(
    state.items[index]._id,
    state.items[index]._rev
  );
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      ...state.items.slice(index + 1),
    ],
  };
};

const addStatus = (state, action) => {
  statusTable.put(action.status);
  return {
    ...state,
    statuses: [
      ...state.statuses,
      action.status,
    ],
  }
}

const loadStatuses = (state, action) => {
  return {
    ...state,
    statuses: [
      ...state.statuses,
      ...action.statuses,
    ],
  };
}

const changePolyColor = (statusId, state) => {
  const status = state.statuses.find(s => s._id === statusId);
  const poly = getPoly();
  if (poly && status) {
    poly.setOptions({ fillColor: status.color });
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
