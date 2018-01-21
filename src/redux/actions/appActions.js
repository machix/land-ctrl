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

export const saveHomeLocation = (lat, lng, zoom) => ({
  type: 'SAVE_HOME_LOCATION',
  lat,
  lng,
  zoom,
});

export const focusOnHome = () => ({ type: 'FOCUS_ON_HOME' });

export const focusOnHomeSuccess = () => ({ type: 'FOCUS_ON_HOME_SUCCESS' });

export const showNotification = (message) => ({
  type: 'SHOW_NOTIFICATION',
  message,
});

export const hideNotification = () => ({ type: 'HIDE_NOTIFICATION' });