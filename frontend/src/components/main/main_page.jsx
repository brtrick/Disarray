import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../stylesheets/splash.css';
import '../../stylesheets/main.css';
import '../../stylesheets/reset.css';
import StartRound from '../newRoundModal/startRoundContainer';


class MainPage extends React.Component {

    render() {
        return (
            <div className='splash-page'>
                <NavLink to='/board' className='start'>Press Start</NavLink>
                <StartRound/>
            </div>
        );
    }
}

export default MainPage;