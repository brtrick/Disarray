import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';

const EndGameModal = ({roundResults, closeModal}) => {
    let roundScores = roundResults.roundResults[0]['currentScores']
    let topScore = Math.max(...roundScores)
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
            <div className='end-wrapper'>
            <h1 className='game-over'>GAME OVER</h1>
            <div>
                <div className='winner'>
                    <div className='game-winner'>
                        { breadWinnerArr.map((topScorer, idx) => (
                            <div key={idx}>{`${topScorer}`}</div>
                            ))}
                    </div>
                    <span>&nbsp;WINS</span>
                    <span>!!!</span>
                </div>
            </div>
    
            <div className='end-scores-container'>
                {playerNames.map((playerName, i) => (
                    <div key={i + 200} className='player-end-modal'>
                        <div key={i + 300}className='end-player-stats'>
                            <h3 key={i + 400}>
                                <div key={i + 500}>{`${playerName}`}</div>
                            </h3>
                            ---
                            <span key={i + 600}>
                                Score: {`${roundScores[i]}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <span className='end-words'> Words Played</span>
            <div className='end-results'>
                { Object.keys(roundResults.roundResults).map((round, idx) => (
                    <div className='roundup' key={idx + 340}>
                        <h4 className='round-title' key={idx + 200}>Round {`${parseInt(round) + 1}`}</h4>
                        <ul className='end-player-word-list' key={idx + 240}>
                            {Object.keys(roundResults.roundResults[round]['wordResults']).map((player, idx) => (
                                <div className='player' key={idx}>{`${player}`}
                                    {Object.keys(roundResults.roundResults[round]['wordResults'][player]).map((word, idx) => { //'the'
                                        if (roundResults.roundResults[round]['wordResults'][player][word] > 0) { return <li className='valid-word' key={idx + 600}>{`${roundResults.roundResults[round]['wordResults'][player][word]} - ${word}`}</li> }
                                        else if (roundResults.roundResults[round]['wordResults'][player][word] === 0) { return <li className='repeated-word' key={idx + 600}>{`${word}`}</li> }
                                        else { return <li className='invalid-word' key={idx + 600}>{`${word}`}</li> }
                                    })}
                                </div>
                            ))}
                        </ul>
                    </div>
                ))
                }
            </div>
            <button className='quit-game'onClick={closeModal}>QUIT</button>
            </div>
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