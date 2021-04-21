import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';

const EndGameModal = ({gameResults, closeModal}) => {

    return (
        <div className='end-game-modal-container'>
            <h1>GAME OVER</h1>
            <button onClick={closeModal}>Quit</button>
        </div>
    )

}

const mSTP = (state, ownProps) => ({
    roundResults: state.ui.modal.roundResults
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(EndGameModal)