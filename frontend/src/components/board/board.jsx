import React from 'react';
import '../../stylesheets/board.css';
import '../../stylesheets/reset.css';
import validMove from '../../util/board_util';
import RoundTimer from "../timers/round_timer";
import errorBoop from '../../audio/error_boop.wav';
import openSocket from "../../sockets/socket";
import RulesButtons from '../rules/rulesButtonsContainer';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardTiles = this.boardTiles.bind(this);
        this.state = {
            board: ["","","","","P","L","A","Y",
                    "N","O","W","!","","","",""],
            selectedTiles:  [
                                false, false, false, false,
                                false, false, false, false,
                                false, false, false, false,
                                false, false, false, false
                            ],
            players: [],
            currentWord: "",
            foundWords: {},
            currentGameActive: false
        }
        this.currentGame = null;

        this.moves=[];
        this.mouseDown = false;
        this.mouseDownTile = -1;
        this.mouseDownMoves = 0;

        this.handleMouseEvent = this.handleMouseEvent.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.startPractice = this.startPractice.bind(this);
        this.timeUp = this.timeUp.bind(this);
        this.errorBoop = new Audio(errorBoop);
        this.socket = null;
        this.receiveGame = this.receiveGame.bind(this);
        this.endRound = this.endRound.bind(this);
    }

    componentDidMount(){
        this.props.fetchLeaderboard();
        this.socket = openSocket({
            receiveGame: this.receiveGame,
            endRound: this.endRound
        });
    }

    componentWillUnmount () {
        this.socket.disconnect();
    }

    endRound({winners, wordResults, currentScores, nextBoard}){
        this.setState({
            winners: winners,
            wordResults: wordResults,
            currentScores: currentScores,
            currentGameActive: true,
            board: nextBoard
        })
        this.props.openModal('new-round');
    }

    receiveGame({board, players, id}) {
        this.currentGame = id;
        this.setState({
            board: board,
            players: players,
            currentGameActive: true
        });
        this.props.openModal('new-game');
    }

    startPractice(e) {
        e.preventDefault();
        this.socket.emit("start-practice", {username: "Brad"});
    }

    boardTiles() {
        const tiles = this.state.board;

        return (
            <ul className='tile-wrapper'>
                {tiles.map((tile, i) => (
                    <li 
                        key={`tile-${i}`}  
                        {...(this.state.currentGameActive && {
                            onMouseDown: this.handleMouseEvent,
                            onMouseEnter: this.handleMouseEvent,
                            onMouseUp: this.handleMouseUp,
                            onMouseLeave: this.handleMouseLeave
                        })}
                        data-letter={tile.toLowerCase()}
                        data-index={i}
                        className={'tile' + (this.state.selectedTiles[i] ? ' selected' : '')}>
                            <p className='letter'>{tile}</p>
                    </li>
                ))}
            </ul>
        )
    }

    handleMouseLeave(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        if (!this.mouseDown) return;
        if (([0, 4, 8, 12   ].includes(index) && (e.nativeEvent.offsetX < 0)) || //exit left side
            ([0, 1, 2, 3    ].includes(index) && (e.nativeEvent.offsetY < 0)) || //exit top
            ([3, 7, 11, 15  ].includes(index) && (e.nativeEvent.offsetX >  e.currentTarget.offsetWidth)) || //exit right
            ([12, 13, 14, 15].includes(index) && (e.nativeEvent.offsetY >= e.currentTarget.offsetHeight))) //exit bottom
        {
                this.submitAndReset();
        }
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

        // undo the last selection if a click
        if (index === lastMove) {
            newSelectedTiles[index] = false;
            this.moves.pop();
            currentWord = currentWord.slice(0, -1);
        }

        //undo the last selection on drag
        else if (index === this.moves[this.moves.length-2]) {
            newSelectedTiles[this.moves.pop()] = false;
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
            this.errorBoop.play()
            return;
        }
        this.setState({
            selectedTiles: newSelectedTiles,
            currentWord: currentWord
        });
    }

    handleMouseUp (e) {
        if (!this.mouseDown) return; // ignore if invalid beginning
        const index = parseInt(e.currentTarget.dataset.index);
        
        // Treat as click if same tile as mouseDown
        // Because moves are processed on mouseDown, moves will be 1 less if tile was originally 
        // selected and 1 more if originally unselected
        if (index === this.mouseDownTile && 
            ((this.moves.length === this.mouseDownMoves + (this.state.selectedTiles[index] ? 1 : -1)) ||
             ((this.moves.length === this.mouseDownMoves - 1) && this.state.selectedTiles[index]))) { //case of click on previous move to erase last move
                this.mouseDownMoves = 0;
                this.mouseDownTile = -1;
                this.mouseDown = false;
                return;
        }
        this.submitAndReset();
    }

    submitAndReset () {
        const foundWords = Object.assign ({}, this.state.foundWords);
        if (this.state.currentWord.length >= 3) foundWords[this.state.currentWord] = true;
        else this.errorBoop.play();
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
        this.mouseDown = false;
        this.moves = [];
    }

    timeUp () {
        this.setState({
            currentGameActive: false
        });
        this.submitAndReset();
        this.socket.emit("finish-round", {
            id: this.currentGame,
            username: this.props.username,
            foundWords: this.state.foundWords
        })
    }

    render() {
       if (!this.props.leaderboard) return null;
       const lead = Object.values(this.props.leaderboard);
       const foundWords = Object.keys(this.state.foundWords).sort();

        return (
            <div className='main-wrapper'>
                <div className='info-wrapper'>
                    <div className='upper-wrap'>
                        <RulesButtons /> 

                        <div className='timer'>
                        {(this.state.currentGameActive && !this.props.modal && <RoundTimer timeUp={this.timeUp}/>)}

                        {(!this.state.currentGameActive && this.currentGame && (<p>Time's Up!</p>))}
                        </div>
                        <div className='spacer'></div>
                    </div>
                    <div className='game-wrapper'>
                        <div className='game'> 
                            <h2 className='info-header'>Word Bank</h2>
                            <div className='side-content'>
                                <div className='words'>
                                    <li className='info-header active-word'>
                                        {this.state.currentWord}
                                    </li>                                   
                                        <ul className='word-box'>
                                            {foundWords.map((foundWord, i) => (
                                                <li key={`foundWord-${i}`} 
                                                    className='found-words'>{foundWord}
                                                </li>
                                            ))}
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div className='board-wrapper'>
                            <h2>{this.boardTiles()}</h2>
                        </div>
                        <div className='score-board'>
                            <h2 className='info-header'>Leader Board</h2>
                            <div className='side-content'>
                                <li className='info-header leader-header'>
                                    <span>Username</span> 
                                    <span>Score</span>
                                </li>
                                <ul className='leader-board'>
                                    {lead.map(user => (
                                        <li key={`${user._id}`}>
                                            <span className='leader-name'>
                                                {user.username}
                                            </span>
                                            <span className='leader-score'>
                                                {user.gamesWon}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='lower-wrapper'>
                        <button className='submit lower-button' onClick={this.submitAndReset.bind(this)}>Submit Word</button>
                        <div className='chat'>
                            <h2 className='info-header'>Chat</h2>
                            <div className='chat-box'>Content</div>
                            <input className='chat-input form-input' type="text" value='say hi'/>
                        </div>
                        <button className='submit lower-button' onClick={this.startPractice}>Practice Game</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;