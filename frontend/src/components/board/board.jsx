import React from 'react';
import '../../stylesheets/board.css'

class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='main-wrapper'>
                <div className='board-wrapper'>
                    Board
                </div>
                <div className='score-board'>
                    Scoreboard
                </div>
            </div>
        )
    }

}

export default Board;