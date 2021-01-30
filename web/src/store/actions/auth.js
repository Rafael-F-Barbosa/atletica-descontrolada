import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loginStart = () => {
	return {
		type: actionTypes.LOGIN_START
	};
};

export const loginSuccess = (token, userId) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const loginFail = (error) => {
	return {
		type: actionTypes.LOGIN_FAIL,
		error: error
	};
};

export const login = (email, password) => {
	return (dispatch) => {
		dispatch(loginStart());
		const loginData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_API_KEY;
		axios
			.post(url, loginData)
			.then((response) => {
        // const expirationDate = new Date()
        console.log('logado', response)
				dispatch(loginSuccess(response.data.idToken, response.data.localId));
      })
      
			.catch((error) => {
        console.log(error)
				dispatch(loginFail(error.response.data.error));
			});
	};
};
