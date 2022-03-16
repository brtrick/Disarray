import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBarContainer from './nav/navbarContainer';

import MainPage from './main/mainPage';
import LoginFormContainer from './session/loginFormContainer';
import SignupFormContainer from './session/signupFormContainer';
import Game from './game/game';
import Modal from './modal/modal';
import NewGameModal from './newGameModal/newGameModal';

const App = () => {
    return (
    <div>
        <Modal/>
        <NewGameModal />
        <NavBarContainer />
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/game" component={Game}/>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Redirect to="/game" />
        </Switch>
    </div>
)};

export default App;
