import { FETCH_WORKOUTS, POST_WORKOUT } from '../constants/index';

const initialState = {
  list: [{
    _id: "",
    name: "",
    primary: "",
    secondary: ""
  }],
  workout: {}
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
    default:
      return state;
  }
}