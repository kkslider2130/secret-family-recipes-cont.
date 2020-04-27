import { axiosWithAuth } from '../utils/axiosWithAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (user) => dispatch => {
    dispatch({ type: LOGIN_START });
    axiosWithAuth()
        .post('/auth/login', user)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.message})
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('userID', JSON.stringify(res.data.message))
        })
        .catch(err => dispatch({ type: LOGIN_ERROR, payload: err}))
}