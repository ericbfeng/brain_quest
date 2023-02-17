 import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../actions/types";

 const initialState = {
    isLoggedIn: false,
    /*
    userInformation: {
        username: string
        password: string
        occupation: string
        questionsSolved: []
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
        case UPDATE_USER:
            return {
                ...state,
                userInformation: action.payload.userInformation,
            }
        default:
            return state;
    }
 }