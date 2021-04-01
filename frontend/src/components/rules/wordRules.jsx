import React from 'react';

class WordRules extends React.Component {
  

    render(){
        return (
            <div className='word-select-rules'>
                <div onClick={this.props.closeModal} className="close-x">X</div>
                <h2 className='modal-title'>How To Select Words</h2>
                <ul className='rule-list'>
                    <li>
                        <span className='bullet'>1.</span> Two ways to make words: Click or Drag
                    </li>
                    <li>
                        <span className='bullet'>2.</span> Click on the letter where u want to start then either click or drag to adjacent letters.
                    </li>
                    <li>
                        <span className='bullet'>3.</span> You can't go back to a previously selected letter or to a letter that is not adjacent to the most recently selected one.
                    </li>
                    <li>
                        <span className='bullet'>4.</span> Once satisfied with your word, click on the submit word button.
                    </li>
                    <span className='closing-message'>Good Luck Disarrayers!</span>
                </ul>
            </div>
        )
    } 
}

export default WordRules;