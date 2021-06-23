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
		token: token,
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
			password: password
		};
		const url = process.env.REACT_APP_BASE_URL + '/auth/login';
		console.log(url)
		axios
			.post(url, loginData)
			.then((response) => {
				console.log(response)
				dispatch(loginSuccess(response.data.token, response.data.userId));
			})
			.catch((error) => {
				console.log(error);
				dispatch(loginFail(error.response.data.error));
			});
	};
};

export const signupStart = () => {
	return {
		type: actionTypes.SIGNUP_START
	};
};

export const signUpSuccess = () => {
	return {
		type: actionTypes.SIGNUP_SUCCESS
	};
};
export const signUpFail = (error) => {
	return {
		type: actionTypes.SIGNUP_FAIL,
		error: error
	};
};

export const signUp = (data) => {
	return (dispatch) => {
		dispatch(signupStart());
		const signUpData = {
			email: data.email,
			password: data.password,
			name: data.name
		};
		const url = process.env.REACT_APP_BASE_URL + '/auth/sign-up';
		axios
			.post(url, signUpData)
			.then((response) => {
				console.log('criado', response);
				dispatch(signUpSuccess());
			})
			.catch((error) => {
				console.log('Deu ruim.');
				dispatch(signUpFail(error.response.data.error));
			});
	};
};

export const logout = () =>{
	return {
		type: actionTypes.LOGOUT
	}
}