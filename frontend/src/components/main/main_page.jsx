import React from 'react';
import '../../stylesheets/main.css';
import '../../stylesheets/reset.css';
import RoundTimer from "../timers/round_timer";
import StartTimer from "../timers/start_timer";

class MainPage extends React.Component {

    render() {
        return (
            <div className='main-wrapper'>
                <h1>Splash</h1>
                <RoundTimer/>
                <StartTimer/>
            </div>
        );
    }
}

export default MainPage;