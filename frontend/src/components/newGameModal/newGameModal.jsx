import React from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/modal.css';
import '../../stylesheets/reset.css';
import NewGameModalContainer from './newGameModalContainer';
import NewRoundModal from '../newRoundModal/newRoundModalContainer';

const NewGameModal = ({modal}) => {
    let component;
    switch (modal) {
        case 'new-game':
            component = <NewGameModalContainer/>;
            break;
        case 'new-round':
            component = <NewRoundModal/>
            break;
        default:
            return null;
    }

    return (
        <div className='modal-background' >
            <div className='modal-child' >
                {component}
            </div>
        </div>
    );
}

const mSTP = state => ({
    modal: state.ui.modal
});

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(NewGameModal);