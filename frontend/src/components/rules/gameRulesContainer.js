import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import GameRules from './gameRules';

const mSTP = state => {

};

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(GameRules)
