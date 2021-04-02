import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';

const NewRoundModal = ({closeModal}) => {
    return (
        <div className='modal-round-container'>
            <h3 className='modal-title-round'>Round 1 Results</h3>
            <ul>
                <li className='modal-round-li'>
                    Player 1 Score: 
                    Player 1 Words: 
                </li>
            </ul>
            <button onClick={closeModal} className='submit game-rules-link'>START ROUND</button>
        </div>
    )
}

const mSTP = state => ({

})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(NewRoundModal);