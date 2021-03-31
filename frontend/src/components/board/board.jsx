import React from 'react';
import '../../stylesheets/board.css';
import '../../stylesheets/reset.css';
import validMove from '../../util/board_util';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardTiles = this.boardTiles.bind(this);
        this.state = {
            selectedTiles: [
                            false, false, false, false,
                            false, false, false, false,
                            false, false, false, false,
                            false, false, false, false
                           ],
            currentWord: "",
            foundWords: {"test": true, "group": true, "abacus": true}
        }
        
        this.moves=[];

        this.handleTileClick = this.handleTileClick.bind(this);
    }

    boardTiles() {
        const tiles = "ABCDEFGHIJKLMNOP".split("");
        // const tiles = [...Array(16).keys()];
        return (
            <ul className='tile-wrapper'>
                {tiles.map((tile, i) => (
                    <li 
                    key={`tile-${i}`}
                    onClick={this.handleTileClick}
                    data-letter={tile}
                    data-index={i}
                    className={'tile' + (this.state.selectedTiles[i] ? ' selected' : '')}>
                        <p className='letter'>{tile}</p>
                    </li>
                ))}
            </ul>
        )
    }

    handleTileClick (e) {
        e.preventDefault();
        const index = parseInt(e.currentTarget.dataset.index);
        const letter = e.currentTarget.dataset.letter;
        const newSelectedTiles = this.state.selectedTiles;
        const lastMove = (this.moves.length > 0) ? this.moves[this.moves.length-1] : -1;
        let currentWord = this.state.currentWord;

        // undo the last selection
        if (index === lastMove) {
            newSelectedTiles[index] = false;
            this.moves.pop();
            currentWord = currentWord.slice(0, -1);
        }
        // select if first move or valid move to an unselected tile
        else if (lastMove === -1 || (validMove(lastMove, index) && !newSelectedTiles[index])) {
            newSelectedTiles[index] = true;
            this.moves.push(index);
            currentWord += letter;
        }
        else {
            //blare obnoxious sound to indicate wrong move
            return;
        }
        this.setState({
            selectedTiles: newSelectedTiles,
            currentWord: currentWord
        });
    }


    render() {
        const foundWords = Object.keys(this.state.foundWords).sort();
        return (
            <div className='main-wrapper'>
                <div className='info-wrapper'>
                    <div className='timer'>
                        <div className='timer-header'>Timer</div>
                        <div className='time'>0:00</div>
                    </div>
                    <div className='game-wrapper'>
                        <div className='game'> 
                            <h2 className='info-header'>Game Info</h2>
                            <div className='side-content'>Content</div>
                        </div>
                        <div className='board-wrapper'>
                            <h2>{this.boardTiles()}</h2>
                        </div>
                        <div className='score-board'>
                            <h2 className='info-header'>Leader Board</h2>
                            <div className='side-content'>Content</div>
                        </div>
                    </div>
                    <div className='word-bank'>
                        <h2 className='info-header'>Word Bank</h2>
                        <div className='words'>
                            <p>{this.state.currentWord}</p>
                            <p>{foundWords}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;