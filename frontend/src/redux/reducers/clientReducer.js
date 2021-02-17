import { FETCH_CLIENTS } from '../constants/index';

const initialState = {
  clients: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}