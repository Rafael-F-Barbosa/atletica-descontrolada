import * as actionTypes from './actionTypes';

export const throwModal = (modalConfig) => {
	return {
		type: actionTypes.THROW_MODAL,
		message: modalConfig.message || '',
		confirmButton: modalConfig.confirmButton || false
	};
};

export const closeModal = () => {
	return {
		type: actionTypes.CLOSE_MODAL
	};
};

export const executeAction = () => {
	return{
		type:actionTypes.EXECUTE_ACTION
	}
}

export const setModalAction = (action) =>{
	return{
		type: actionTypes.SET_MODAL_ACTION,
		action: action.action
	}
} 