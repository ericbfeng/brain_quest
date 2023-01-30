import { LOGIN_USER, LOGOUT_USER } from "./types";

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