import store from '../store';

const defaultState = {
  items: [],
  statuses: [
    {
      name: 'Uzarta',
      id: '0',
    }, {
      name: 'Paseta',
      id: '1',
    }, {
      name: 'Tuscia',
      id: '2',
    }
  ],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_FIELD':
      changePolyColor(action.field.color);
      return {
        ...state,
        items: [ ...state.items, action.field ],
      };
    case 'UPDATE_FIELD':
      return updateField(state, action);
    case 'DELETE_FIELD':
      return deleteField(state, action);
    default:
      return state;
  }
}

const updateField = (state, action) => {
  const index = state.items.find(f => f.id === action.field.id);
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
  const index = state.items.find(f => f.id === action.id);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      ...state.items.slice(index + 1),
    ],
  };
};

const changePolyColor = (color) => {
  const poly = store.getState().app.selectedPoly;
  if (poly) {
    poly.setOptions({ fillColor: color });
  }
}
