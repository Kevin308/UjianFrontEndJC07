import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    COOKIE_CHECKED,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = { username: '', error: '', loading: false, cookie: false};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE, username: action.payload, cookie: true};
        case AUTH_SYSTEM_ERROR :
            return {...INITIAL_STATE, error: action.payload, cookie: true};
        case AUTH_LOADING :
            return {...INITIAL_STATE, loading: true, cookie: true};   
        case COOKIE_CHECKED :
            return {...INITIAL_STATE, cookie: true};      
        case LOGOUT :
            return {...INITIAL_STATE, cookie: true};   
        default :
            return state;
    }
}