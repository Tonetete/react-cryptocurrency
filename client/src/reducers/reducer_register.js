import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { error: '', message: '', registered: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        error: '',
        message: 'request register',
        registered: false,
        payload: action.payload
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        error: '',
        message: 'register success',
        registered: true,
        payload: action.payload
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.error,
        message: 'register fail',
        registered: false
      };
    default:
      return state;
  }
}
