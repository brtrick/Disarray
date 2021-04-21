import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';
import ModalTimer from './modalTimer';


const NewRoundModal = ({roundResults, closeModal}) => {
    // PLACE TIMER HERE FOR STARTING NEXT ROUND
    
    return (
        <div className='modal-round-container'>
            <h1 className='modal-round-results'>Round {`${roundResults.roundNumber}`} Results</h1>
               <div className='round-winner-container'>
                {   roundResults.winners.map(winner => (
                    <h2 className='round-winner'> Round Winner: {`${winner}`}
                    </h2>
                ))
                }
                </div>
            <div className='round-scores-container'>
              { Object.keys(roundResults.wordResults).map((player, idx) => (
                  <div key={idx} className='player-round-modal'>
                      <div className='player-stats'>
                        <h3>
                            {`${player}`}
                        </h3>
                        ---
                        <span>
                            Score: {`${roundResults.currentScores[idx]}`}
                        </span>
                      </div>
                      <ul className='player-word-list'>
                          <span className='words'>Words</span>
                        {Object.keys(roundResults.wordResults[player]).map(word => {
                            if (roundResults.wordResults[player][word] > 0 ) {return <li className='valid-word'>{`${word}`}</li>}
                            else if (roundResults.wordResults[player][word] === 0 ) {return <li className='repeated-word'>{`${word}`}</li>}
                            else {return <li className='invalid-word'>{`${word}`}</li>}
                        })
                        }
                      </ul>
                  </div>
              ))

              }  
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

