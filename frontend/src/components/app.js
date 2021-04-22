import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import BoardContainer from './board/board_container';
import Modal from './modal/modal';
import NewGameModal from './newGameModal/newGameModal';

const App = () => (
    <div>
        <Modal/>
        <NewGameModal />
        <NavBarContainer />
        <Route exact path="/" component={MainPage} />
        <Route path="/board" component={BoardContainer}/>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;