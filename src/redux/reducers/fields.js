
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
      return {
        ...state,
        items: [ ...state.items, action.field ],
      };
    case 'UPDATE_FIELD':
      return updateField(state, action);
    default:
      return state;
  }
}

const updateField = (state, action) => {
  const index = state.items.find(f => f.id === action.field.id);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      action.field,
      ...state.items.slice(index + 1),
    ],
  };
};