import { FETCH_WORKOUTS, POST_WORKOUT, DELETE_WORKOUT, UPDATE_WORKOUT } from '../constants/index';

const initialState = {
  list: [{
    _id: "",
    name: "",
    primary: "",
    secondary: ""
  }],
  workout: {},
  deletedWorkout: {},
  updatedWorkout: {}
};
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_WORKOUTS:
      return {
        ...state,
        list: action.workoutList
      };
    case POST_WORKOUT:
    return {
      ...state,
      workout: action.workoutList
    };
    case DELETE_WORKOUT:
    return {
      ...state,
      deletedWorkout: action.workout
    };
    case UPDATE_WORKOUT:
    return {
      ...state,
      updatedWorkout: action.workout
    };
    default:
      return state;
  }
}