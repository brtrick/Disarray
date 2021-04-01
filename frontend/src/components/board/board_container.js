import { connect } from 'react-redux';
import Board from './board';
import {fetchLeaderboard} from '../../actions/game_actions';

const mSTP = state => ({
    leaderboard: state.leaderboard
});

const mDTP = dispatch => ({
    fetchLeaderboard: () => dispatch(fetchLeaderboard())
});

export default connect(mSTP, mDTP)(Board);
