import * as actionTypes from './actionTypes';

export const throwModal = (message) => {
	return {
		type: actionTypes.THROW_MODAL,
		message: message
	};
};

export const closeModal = () => {
	return {
		type: actionTypes.CLOSE_MODAL
	};
};