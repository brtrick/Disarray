import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';
import ModalTimer from './modalTimer';


const NewRoundModal = ({roundResults, closeModal}) => {
    // PLACE TIMER HERE FOR STARTING NEXT ROUND
    
    return (
        <div className='modal-round-container'>
            <h1 className='modal-title-round'>Round {`${roundResults.roundNumber}`} Results</h1>
               <div className='round-winner-container'>
                {   roundResults.winners.map(winner => (
                    <h2 className='round-winner'> Round Winner: {`${winner}`}
                    </h2>
                ))
                }
                </div>
            <div className='round-scores-container'>

            </div>
            <ModalTimer closeModal={closeModal}/>
        </div>
    )
}

const mSTP = (state, ownProps) => ({
    roundResults: state.ui.modal.roundResults
    // PASS INFORMATION FROM ROUND RESULTS FROM GAME SERVER TO PROPS
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(NewRoundModal);

