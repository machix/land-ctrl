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