import { connect } from 'react-redux';
import { signup } from '../../actions/sessionActions';
import SignupForm from './signupForm';

const mSTP = (state) => {
    return {
        signedIn: state.session.isAuthenticated,
        errors: state.errors.session
    };
};

const mDTP = (dispatch) => {
    return {
        signup: user => dispatch(signup(user))
    }
}

export default connect(mSTP, mDTP)(SignupForm);
