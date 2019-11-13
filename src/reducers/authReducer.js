import { LOGIN_USER, LOGIN_USER_FAIL, LOGOUT, LOGIN_USER_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
  };

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
        return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, error: action.payload, password: '', loading: false };
        case LOGOUT:
        return { INITIAL_STATE };
        default:
            return state;
    }
};