import { FETCH_WORKOUTS, POST_WORKOUT, DELETE_WORKOUT } from '../constants/index';

const initialState = {
  list: [{
    _id: "",
    name: "",
    primary: "",
    secondary: ""
  }],
  workout: {},
  deletedWorkout: {}
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
    default:
      return state;
  }
}