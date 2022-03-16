import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken, getUser } from './util/session_api_util';
import { logout, receiveCurrentUser, receiveErrors } from './actions/sessionActions';
import { fetchLeaderboard } from './actions/gameActions';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore({});

    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decodedUser = jwt_decode(localStorage.jwtToken);
      getUser(decodedUser.id).then(res => {
        store.dispatch(receiveCurrentUser(res.data))
      }) 
      .catch(err => (
        store.dispatch(receiveErrors(err.response.data))
      )); 
      // const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
      // store = configureStore(preloadedState);
      const currentTime = Date.now() / 1000;

      if (decodedUser.exp < currentTime) {
        store.dispatch(logout());
      }
    } 

    const root = document.getElementById('root');

    if (process.env.NODE_ENV !== 'production') {
        window.dispatch = store.dispatch
        window.getState = store.getState
        window.fetchLeaderboard = fetchLeaderboard;
    }
    
    ReactDOM.render(<Root store={store} />, root);
})
