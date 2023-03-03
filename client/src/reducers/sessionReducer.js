 import { LOGIN_USER, LOGOUT_USER, UPDATE_USER, UPDATE_TAB } from "../actions/types";

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
    userInformation: {},
    // Determines what tab is shown on the home page.
    lastTabClicked: 0,
 }

 export default function sessionReducer(state = initialState, action) {
    console.log(action.type);
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
        case UPDATE_TAB:
            return {
                ...state,
                lastTabClicked: action.payload,
            }
        default:
            return state;
    }
 }