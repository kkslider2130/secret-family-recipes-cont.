import axiosWithAuth from '../utils/axiosWithAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (history) => dispatch => {
    dispatch({ type: LOGIN_START });
    axiosWithAuth()
        .post('/auth/login', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        } )
        .then(res => {
            console.log(' action res', res)
            console.log('token', res.data.token)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data})
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('userID', JSON.stringify(res.data.message))
            history.push('/recipes')
        })
        .catch(err => dispatch({ type: LOGIN_FAILURE, payload: err}))
}