import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import userReducer from './userReducer';
import workoutReducer from './workoutReducer';

export default combineReducers({
  user: userReducer,
  clients: clientReducer,
  workouts: workoutReducer
});