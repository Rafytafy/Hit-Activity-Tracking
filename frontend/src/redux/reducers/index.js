import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import userReducer from './userReducer'

export default combineReducers({
  user: userReducer,
  clients: clientReducer
});