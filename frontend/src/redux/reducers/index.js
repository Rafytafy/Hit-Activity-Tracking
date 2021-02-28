import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import userReducer from './userReducer';
import workoutReducer from './workoutReducer';
import routineReducer from './routineReducer'

export default combineReducers({
  user: userReducer,
  clients: clientReducer,
  workouts: workoutReducer,
  routines: routineReducer
});