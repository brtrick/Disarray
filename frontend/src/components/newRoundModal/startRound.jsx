import React from 'react';

const StartRound = ({openModal}) => {
    const modalLink = () => (
        <div className='start-round-container'>
            <button onClick={() => openModal('new-round')} className='submit game-rules-link'>NEW ROUND</button>
        </div>
    )

    return (
        modalLink()
    )
}

export default StartRound;