import React from 'react';
import {closeModal} from '../../actions/modal_actions';
import {connect} from 'react-redux';
import WordRulesContainer from '../rules/wordRulesContainer';
import GameRulesContainer from '../rules/gameRulesContainer';
import '../../stylesheets/modal.css';
import '../../stylesheets/reset.css';

const Modal = ({modal, closeModal}) => {

    let component;
    switch (modal) {
        case 'game-rules':
            component = <GameRulesContainer />;
            break;
        case 'word-rules':
            component = <WordRulesContainer />;
            break;
        default:
            return null;
    }
    return (
        
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-child' onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

const mSTP = state => ({
    modal: state.ui.modal
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Modal)