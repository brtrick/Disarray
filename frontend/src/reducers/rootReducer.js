import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import leaderboard from './leaderboard_reducer'
import ui from "./ui_reducer";
import socket from './socketReducer';
import board from './boardReducer';
import timer from './timerReducer';

const RootReducer = combineReducers({
    session,
    ui,
    errors,
    leaderboard,
    socket,
    board, 
    timer
});

export default RootReducer;
