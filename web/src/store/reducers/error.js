import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    hasModal: false,
    message: ''
};

const throwModal = (state, action) => {
    return updateObject(state, { hasModal: true, message: action.message })
}
const closeModal = (state, action) => {
    return updateObject(state, { hasModal: false, message: {} })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.THROW_MODAL:
            return throwModal(state, action)
        case actionTypes.CLOSE_MODAL:
            return closeModal(state, action)
        default:
            return state;
    }
}

export default reducer