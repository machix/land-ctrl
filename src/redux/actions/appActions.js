export const selectField = (id) => ({
  type: 'SELECT_FIELD',
  id,
});

export const hideFieldInfo = () => ({ type: 'HIDE_FIELD_INFO' });

export const removeSelectedPoly = () => ({ type: 'REMOVE_SELECTED_POLY' });

export const deselectPoly = () => ({ type: 'DESELECT_POLY' });

export const selectPoly = (poly) => ({ type: 'SELECT_POLY', poly})

export const enableDrawing = (enabled) => ({
  type: 'TOGGLE_DRAWING',
  enabled,
});