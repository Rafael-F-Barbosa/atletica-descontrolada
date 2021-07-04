import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    hasModal: false,
    confirmButton: false,
    message: '',
    executeAction: false,
    action: () => {}
};

const throwModal = (state, action) => {
    return updateObject(state, {
        hasModal: true,
        message: action.message,
        confirmButton: action.confirmButton,
        executeAction: false
    })
}
const closeModal = (state, action) => {
    return updateObject(state, {
        hasModal: false,
        confirmButton: false,
        message: '',
        executeAction: false
    })
}
const executeAction = (state, action) => {
    console.log(state.action);
    return updateObject(state, { executeAction: true })
}

const setModalAction = (state, action) => {
    return updateObject(state, {action: action.action})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.THROW_MODAL:
            return throwModal(state, action)
        case actionTypes.CLOSE_MODAL:
            return closeModal(state, action)
        case actionTypes.EXECUTE_ACTION:
            return executeAction(state, action)
        case actionTypes.SET_MODAL_ACTION:
            return setModalAction(state, action)
        default:
            return state;
    }
}

export default reducer