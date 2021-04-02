import { connect } from 'react-redux';
import Board from './board';
import {fetchLeaderboard} from '../../actions/game_actions';
import {openModal} from '../../actions/modal_actions'
// import { session } from 'passport';

const mSTP = state => ({
    leaderboard: state.leaderboard,
    username: state.session.user.username,
    modal: state.ui.modal
});

const mDTP = dispatch => ({
    fetchLeaderboard: () => dispatch(fetchLeaderboard()),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(Board);
