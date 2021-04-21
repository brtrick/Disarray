import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';

const EndGameModal = ({roundResults, closeModal}) => {
    let roundScores = roundResults.roundResults[0]['currentScores']
    let topScore = Math.max(roundScores)
    let breadWinner = []
    let playerNames = Object.keys(roundResults.roundResults[0]['wordResults'])

    for (let i = 0; i < roundScores.length; i++) {
        if (roundScores[i] === topScore) {
            breadWinner.push(i)
        }
    }

    let breadWinnerArr = []
    breadWinner.forEach(i => {
        breadWinnerArr.push(playerNames[i])
    })

    return (
        <div className='end-game-modal-container'>
            <h1>GAME OVER</h1>
            <div>
                <h2 className='game-winner'>TOP SCORER</h2>
                { breadWinnerArr.map(topScorer => (
                    <div>{`${topScorer}`}</div>
                )) }
            </div>
    
            <div className='round-scores-container'>
                {playerNames.map((playerName, i) => (
                    <div key={i} className='player-round-modal'>
                        <div className='player-stats'>
                            <h3>
                                <div>{`${playerName}`}</div>
                            </h3>
                            ---
                            <span>
                                Score: {`${roundScores[i]}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                { Object.keys(roundResults.roundResults).map(round => (
                    <div>
                        <span className='words'>Round: {`${parseInt(round)+1}`} Words Played</span>
                        <ul className='player-word-list'>
                            {Object.keys(roundResults.roundResults[round]['wordResults']).map(player => (
                                Object.keys(roundResults.roundResults[round]['wordResults'][player]).map(word => { //'the'
                                    if (roundResults.roundResults[round]['wordResults'][player][word] > 0) { return <li className='valid-word'>{`${word}`}</li> }
                                    else if (roundResults.roundResults[round]['wordResults'][player][word] === 0) { return <li className='repeated-word'>{`${word}`}</li> }
                                    else { return <li className='invalid-word'>{`${word}`}</li> }
                                })
                            ))}
                        </ul>
                    </div>
                ))
                }
            </div>
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
// {Object.keys(roundResults.wordResults[player]).map(word => {
//     if (roundResults.wordResults[player][word] > 0) { return <li className='valid-word'>{`${word}`}</li> }
//     else if (roundResults.wordResults[player][word] === 0) { return <li className='repeated-word'>{`${word}`}</li> }
//     else { return <li className='invalid-word'>{`${word}`}</li> }
// })
// }