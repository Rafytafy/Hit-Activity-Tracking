import { FETCH_CLIENTS } from '../constants/index';

const initialState = {
  clients: []
};
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: action.clientList
      };
    default:
      return state;
  }
}