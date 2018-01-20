import { combineReducers } from 'redux';
import app from './app';
import fields from './fields';

export default combineReducers({
  app,
  fields,
});