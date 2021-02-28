import { FETCH_CURRENT_USER } from '../constants/index';

const initialState = {
  data: [{
      name: {
          firstname: "",
          lastName: ""
      },
      uid: ""
  }]
};
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        data: action.userData
      };
    default:
      return state;
  }
}