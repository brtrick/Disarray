import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import WordRules from './wordRules';

const mSTP = () => ({
    
})



const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(WordRules)
