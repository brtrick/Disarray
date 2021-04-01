import {RECEIVE_CURRENT_LEADERBOARD} from "../actions/game_actions";


const initialState = {};

const leaderboardReducer = (state = initialState, action) => {
    Object.freeze(state);
    // let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_LEADERBOARD:
            // nextState = action.leaderboard;
            // return nextState;
            return Object.assign({}, state, action.leaderboard.data);    
        default:
            return state;
    }
}

export default leaderboardReducer;