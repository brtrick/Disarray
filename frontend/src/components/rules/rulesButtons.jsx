import React from 'react'


const RulesButtons = ({openModal}) => {
    const modalLinks = () => (
        <div className='rules-links-container'>
            <button onClick={() => openModal('game-rules')} className='submit game-rules-link'>Game Rules</button>
            <button onClick={() => openModal('word-rules')} className='submit word-rules-link'>Word Rules</button>
        </div>
    )

    return (
        modalLinks()
    )
}


export default RulesButtons;



