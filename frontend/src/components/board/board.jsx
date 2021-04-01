import React from 'react';
import '../../stylesheets/board.css';
import '../../stylesheets/reset.css';
import validMove from '../../util/board_util';


class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardTiles = this.boardTiles.bind(this);
        this.state = {
            selectedTiles:  [
                                false, false, false, false,
                                false, false, false, false,
                                false, false, false, false,
                                false, false, false, false
                            ],
            currentWord: "",
            foundWords: {"test": true, "GROUP": true, "abacus": true}
        }
        
        this.moves=[];
        this.mouseDown = false;
        this.mouseDownTile = -1;
        this.mouseDownMoves = 0;

        this.handleMouseEvent = this.handleMouseEvent.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    boardTiles() {
        const tiles = "ABCDEFGHIJKLMNOP".split("");
        // const tiles = [...Array(16).keys()];
        return (
            <ul className='tile-wrapper'>
                {tiles.map((tile, i) => (
                    <li 
                    key={`tile-${i}`}
                    // onClick={this.handleTileClick}
                    onMouseDown={this.handleMouseEvent}
                    onMouseEnter={this.handleMouseEvent}
                    onMouseUp={this.handleMouseUp}
                    data-letter={tile}
                    data-index={i}
                    className={'tile' + (this.state.selectedTiles[i] ? ' selected' : '')}>
                        <p className='letter'>{tile}</p>
                    </li>
                ))}
            </ul>
        )
    }

    handleMouseEvent (e) {
        if (e.type === "mouseenter" && !this.mouseDown) return;
        
        const index = parseInt(e.currentTarget.dataset.index);
        if (e.type === "mousedown") {
            this.mouseDown = true;
            this.mouseDownTile = index;
            this.mouseDownMoves = this.moves.length;    
        }
    
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
        // select tile if first move or valid move to an unselected tile
        else if (lastMove === -1 || (validMove(lastMove, index) && !newSelectedTiles[index])) {
            newSelectedTiles[index] = true;
            this.moves.push(index);
            currentWord += letter;
        }
        else {
            if (e.type === "mousedown") this.mouseDown = false;
            //blare obnoxious sound to indicate wrong move
            return;
        }
        this.setState({
            selectedTiles: newSelectedTiles,
            currentWord: currentWord
        });
    }

    handleMouseUp (e) {
        if (!this.mouseDown) return; // ignore if invalid beginning
        this.mouseDown = false;
        const index = parseInt(e.currentTarget.dataset.index);
        
        // Treat as click if same tile as mouseDown
        // Because moves are processed on mouseDown, moves will be 1 less if tile was originally 
        // selected and 1 more if originally unselected
        if (index === this.mouseDownTile && 
            this.moves.length === (this.mouseDownMoves + (this.state.selectedTiles[index] ? 1 : -1))) {
                this.mouseDownMoves = 0;
                this.mouseDownTile = -1;
                return;
        }

        // submit word and reset the board
        const foundWords = Object.assign ({}, this.state.foundWords);
        foundWords[this.state.currentWord] = true;
        this.setState ({
            currentWord: "",
            foundWords: foundWords,
            selectedTiles: [
                                false, false, false, false,
                                false, false, false, false,
                                false, false, false, false,
                                false, false, false, false
                            ]
        });
        this.mouseDownMoves = 0;
        this.mouseDownTile = -1;
        this.moves = [];
    }


    render() {
        const foundWords = Object.keys(this.state.foundWords).sort();
        return (
            <div className='main-wrapper'>
                <div className='info-wrapper'>
                    <div className='timer'>
                        <div className='timer-header'>Timer</div>
                        <RoundTimer/>
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
                            <ul>
                                <li>{this.state.currentWord}</li>
                                <li>{foundWords}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;