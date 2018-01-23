export const addField = (field) => ({
  type: 'ADD_FIELD',
  field,
});

export const updateField = (field, dontSaveToDb) => ({
  type: 'UPDATE_FIELD',
  field,
  dontSaveToDb,
});

export const deleteField = (id) => ({
  type: 'DELETE_FIELD',
  id,
});

export const addStatus = (status) => ({
  type: 'ADD_STATUS',
  status,
});

export const loadStatuses = (statuses) => ({
  type: 'LOAD_STATUSES',
  statuses,
});