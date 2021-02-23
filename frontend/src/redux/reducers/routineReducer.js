import { FETCH_ROUTINES, SET_CURRENT_ROUTINE, CREATE_ROUTINE} from '../constants/index';

const initialState = {
  list: [{
    _id: "",
    name: "",
    workouts: [{
        duration: 0
    }]
  }],
  currentRoutine: {},
  newRoutine: {}
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
      case CREATE_ROUTINE:
      return {
        ...state,
        newRoutine: action.routine
      };
    default:
      return state;
  }
}