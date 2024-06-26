import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modalActions';


const modalReducer = (state = null, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {type: action.modal, roundResults: action.roundResults}
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}

export default modalReducer;
