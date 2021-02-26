import { FETCH_CLIENTS, SET_CURRENT_CLIENT} from '../constants/index';

const initialState = {
  list: [{
    currentClient:{}
  }]
};
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        list: action.clientList
      };
    case SET_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: action.client
      }

    default:
      return state;
  }
}

