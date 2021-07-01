import * as actionTypes from './actionTypes';
import axios from 'axios';
import {throwError} from './index'

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
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('userId', response.data.userId);
				dispatch(loginSuccess(response.data.token, response.data.userId));
			})
			.catch((error) => {
				dispatch(loginFail(error.response.data.error));
				dispatch(throwError(error.response.data))
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
				dispatch(throwError(error.response.data));
			});
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.LOGOUT
	}
}

export const checkLogin = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		}else{
			const userId = localStorage.getItem('userId')
			dispatch(loginSuccess(token, userId))
		}
	}
}