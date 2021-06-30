import * as actionTypes from './actionTypes';

export const throwError = () => {
	return {
		type: actionTypes.THROW_ERROR
	};
};

export const endError = () => {
	return {
		type: actionTypes.END_ERROR
	};
};