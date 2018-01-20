export const addField = (field) => ({
  type: 'ADD_FIELD',
  field,
});

export const updateField = (field) => ({
  type: 'UPDATE_FIELD',
  field,
});

export const deleteField = (id) => ({
  type: 'DELETE_FIELD',
  id,
});