import { connect } from 'react-redux';
import Board from './board';
import {fetchLeaderboard} from '../../actions/game_actions';
// import { session } from 'passport';

const mSTP = state => ({
    leaderboard: state.leaderboard,
    username: state.session.user.username
});

const mDTP = dispatch => ({
    fetchLeaderboard: () => dispatch(fetchLeaderboard())
});

export default connect(mSTP, mDTP)(Board);
