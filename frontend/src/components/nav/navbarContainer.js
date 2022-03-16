import { connect } from 'react-redux';
import { logout } from '../../actions/sessionActions';
import {openModal} from '../../actions/modalActions';
import NavBar from './navbar';

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal))
})


export default connect(mSTP, mDTP)(NavBar);
