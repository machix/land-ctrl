const selectedColor = '#2baf2b'; //TODO: move to constants

const defaultState = {
  selectedField: null,
  selectedPoly: null,
  showFieldInfo: false,
  drawingEnabled: false,
  isLoading: true,
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
    default:
      return state;
  }
}

const selectPoly = (state, action) => {
  deselectPoly(state);
  action.poly.setOptions({ strokeColor: selectedColor });
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