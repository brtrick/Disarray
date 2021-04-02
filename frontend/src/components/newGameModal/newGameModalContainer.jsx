import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';


const NewGameModal = ({closeModal}) => {
    return (
        <div className='new-game-modal-container'>
            <h2 className='modal-title-game'>Click Join Game to Start a Game</h2>
            <button onClick={closeModal} className='submit game-rules-link'>JOIN GAME</button>
        </div>
    )
}




const mSTP = state => {

};

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(NewGameModal);