import React from 'react';
import '../../stylesheets/board.css'
import '../../stylesheets/reset.css';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardTiles = this.boardTiles.bind(this);
    }

    boardTiles() {
        const tiles = [...Array(16).keys()];
        return (
            <ul className='tile-wrapper'>
                {tiles.map((tile, i) => (
                    <li 
                    key={`tile-${i}`}
                    className='tile tile-i'>
                        <p classname='letter'>{`${tile}`}</p>
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div className='main-wrapper'>
                <div className='game-wrapper'>
                    <div className='game-info'> 
                        <h2 className='side-header'>Game Info</h2>
                        <div className='side-content'>Content</div>
                    </div>
                    <div className='board-wrapper'>
                        <h2>{this.boardTiles()}</h2>
                    </div>
                    <div className='score-board'>
                        <h2 className='side-header'>Score Board</h2>
                        <div className='side-content'>Content</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;