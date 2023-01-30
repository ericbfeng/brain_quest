 import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

 const initialState = {
    isLoggedIn: false,
    /*
    userInformation: {
        username: string
        password: string
    }
    */
    userInformation: {}
 }

 export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                userInformation: action.payload.userInformation,
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                userInformation: action.payload.userInformation,
            }
        default:
            return state;
    }
 }