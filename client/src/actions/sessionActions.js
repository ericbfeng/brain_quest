import { LOGIN_USER, LOGOUT_USER, UPDATE_USER, UPDATE_TAB } from "./types";

export const loginUser = (response) => dispatch => {
    dispatch({
        type: LOGIN_USER,
        payload: response
    })
}

export const logoutUser = (response) => dispatch => {
    dispatch({
        type: LOGOUT_USER,
        payload: response
    })
}

export const updateUser = (response) => dispatch => {
    dispatch({
        type: UPDATE_USER,
        payload: response
    })
}

export const updateTab = (response) => dispatch => {
    dispatch({
        type: UPDATE_TAB,
        payload: response,
    })
}