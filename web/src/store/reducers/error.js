import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    hasError: false,
};

const throwError = (state, action) => {
    return updateObject(state, { hasError: true })
}
const endError = (state, action) => {
    return updateObject(state, { hasError: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.THROW_ERROR:
            return throwError(state, action)
        case actionTypes.END_ERROR:
            return endError(state, action)
        default:
            return state;
    }
}

export default reducer