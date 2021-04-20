import React from 'react';


const StartRound = ({openModal}) => {
    const modalLink = () => (
        <>
            <button onClick={() => openModal('new-round')} className='submit game-rules-link'>NEW ROUND</button>
        </>
    )

    return (
        modalLink()
    )
}

export default StartRound;