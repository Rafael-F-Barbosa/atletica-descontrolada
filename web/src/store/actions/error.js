import * as actionTypes from './actionTypes';

export const throwError = (error) => {
	return {
		type: actionTypes.THROW_ERROR,
		error: error
	};
};

export const endError = () => {
	return {
		type: actionTypes.END_ERROR
	};
};