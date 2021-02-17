import { combineReducers } from 'redux';
import clientReducer from './clientReducer';

export default combineReducers({
  clients: clientReducer
});