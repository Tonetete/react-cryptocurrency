// State argument is not application state, only the State
// that reducer is responsible for

import { GET_COINS_USER } from '../actions/types';

export const coinsUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COINS_USER:
      return {
        ...state,
        coins: action.payload
      };
    default:
      return state;
  }
};
