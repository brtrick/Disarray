import React from 'react';

class WordRules extends React.Component {
  

    render(){
        return (
            <div className='word-select-rules'>
                <div onClick={this.props.closeModal} className="close-x">X</div>
                <h2 className='modal-title'><span>How To Select Words</span></h2>
                <ul className='word-select-rules'>
                    <li>
                       1. Two ways to make words: Click or Drag
                    </li>
                    <li>
                       2. Click on the letter where u want to start then either click or drag to adjacent letters.
                    </li>
                    <li>
                       3. You can't go back to a previously selected letter or to a letter that is not adjacent to the most recently selected one.
                    </li>
                    <li>
                       4. Once satisfied with your word, click on the submit word button.
                    </li>
                    <span>Good Luck Disarrayers!</span>
                </ul>
            </div>
        )
    } 
}

export default WordRules;