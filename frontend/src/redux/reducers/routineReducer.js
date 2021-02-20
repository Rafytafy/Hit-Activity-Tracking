import { FETCH_ROUTINES, SET_CURRENT_ROUTINE} from '../constants/index';

const initialState = {
  list: [{
    _id: "",
    name: "",
    workouts: [{
        duration: 0
    }]
  }],
  currentRoutine: {}
};
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROUTINES:
      return {
        ...state,
        list: action.routines
      };
      case SET_CURRENT_ROUTINE:
      return {
        ...state,
        currentRoutine: action.routine
      };
    default:
      return state;
  }
}