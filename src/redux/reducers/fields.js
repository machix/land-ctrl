
const defaultState = {
  items: [{
    id: 'asdasda',
    status: '2',
  }],
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
    default:
      return state;
  }
}