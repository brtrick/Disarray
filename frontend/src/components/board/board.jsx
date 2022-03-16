import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validMove from '../../util/board_util';
import errorBoopSound from '../../audio/error_boop.wav';
import WordBank from '../wordBank/wordBank';
import Tile from '../tile/tile';
import { resetSelected } from '../../actions/boardActions';
import { setTimeUp } from '../../actions/timerActions';
import '../../stylesheets/reset.css';
import '../../stylesheets/board.css';

function Board ({ finishRound }) {
  const [board, setBoard] = 
    useState(["","","","","P","L","A","Y",
              "N","O","W","!","","","",""]);
  const [currentWord, setCurrentWord] = useState ("");
  const [foundWords, setFoundWords] = useState ({});
  
  const moves = useRef([]);
  const mouseDown = useRef(false);
  const mouseDownTile = useRef(-1);
  const mouseDownMoves = useRef(0);
  
  const errorBoop = useMemo (() => new Audio(errorBoopSound), []);
  const dispatch = useDispatch();

  const timeUp = useSelector(state => state.timer.timeUp);
  const socket = useSelector (state => state.socket.socket);
  const setSelectedForPrevTile = useRef(null);

  const initializeBoard = () => {
    setBoard(["","","","","P","L","A","Y",
              "N","O","W","!","","","",""]);
    setCurrentWord ("");
    setFoundWords ({});
  }

  const prepareNextRound = ({ nextBoard }) => {
    setBoard(nextBoard);
    setFoundWords({});
  }

  useEffect( () => {
    if (!socket) return;

    socket.on("startGame", ({ board }) => setBoard(board));
    socket.on("endGame", initializeBoard);
    socket.on("roundResults", prepareNextRound);
    
    return () => {
      socket.off("startGame", ({ board }) => setBoard(board));
      socket.off("endGame", initializeBoard);
      socket.off("roundResults", prepareNextRound);
    }
  }, [socket]);

  const handleMouseLeaveBoard = () => {
    if (!mouseDown.current) return;
    submitAndReset();
  }

  const handleMouseLeaveTile = setSelected => {
    if (!mouseDown.current) return;
    setSelectedForPrevTile.current = setSelected;
  }

  const handleMouseEvent = (type, letter, index, selected, setSelected) => {
    if (type === "mouseenter" && !mouseDown.current) return;
    
    if (type === "mousedown") {
        mouseDown.current = true;
        mouseDownTile.current = index;
        mouseDownMoves.current = moves.current.length;    
    }

    const lastMove = (moves.current.length > 0) ? moves.current[moves.current.length-1] : -1;
    let curWord = currentWord;

    // undo the last selection if a click
    if (index === lastMove) {
      setSelected(false);
      moves.current.pop();
      curWord = curWord.slice(0, -1);
    }

    //undo the last selection on drag
    else if (index === moves.current[moves.current.length-2]) {
      setSelectedForPrevTile.current(false);
      setSelectedForPrevTile.current = null;
      moves.current.pop();
      curWord = curWord.slice(0, -1);
    }

    // select tile if first move or valid move to an unselected tile
    else if (lastMove === -1 || (validMove(lastMove, index) && !selected)) {
        setSelected(true);
        moves.current.push(index);
        curWord += letter.toLowerCase();
    }
    else {
        if (type === "mousedown") mouseDown.current = false;
        //blare obnoxious sound to indicate wrong move
        errorBoop.play()
        return;
    }
    
    setCurrentWord(curWord);
  }

  const handleMouseUp = (index, selected) => {
    if (!mouseDown.current) return; // ignore if invalid beginning
    
    // Treat as click if same tile as mouseDown
    // Because moves are processed on mouseDown, moves will be 1 less if tile was originally 
    // selected and 1 more if originally unselected
    if (index === mouseDownTile.current && 
        ((moves.current.length === mouseDownMoves.current + (selected ? 1 : -1)) ||
          ((moves.current.length === mouseDownMoves.current - 1) && selected))) { //case of click on previous move to erase last move
            mouseDownMoves.current = 0;
            mouseDownTile.current = -1;
            mouseDown.current = false;
            return;
    }
    submitAndReset();
  }

  const submitAndReset = useCallback (({ submit = true, timeUp = false } = {}) => {
    if (submit) {
      if (currentWord.length < 3) {
        errorBoop.play();
        if (timeUp) {
          finishRound ({
            foundWords: Object.fromEntries(Object.entries(foundWords).sort())
          });
        }
      }
      else {
        setFoundWords ({ ...foundWords, [currentWord]: true });
        if (timeUp) {
          finishRound({
            foundWords: Object.fromEntries(Object.entries({ ...foundWords, [currentWord]: true }).sort())
          });
        }
      }
    }

    // Reset word
    setCurrentWord("");
    dispatch(resetSelected(true));
    mouseDownMoves.current = 0;
    mouseDownTile.current = -1;
    mouseDown.current = false;
    moves.current = [];
  }, [dispatch, currentWord, errorBoop, finishRound, foundWords]);
  
  useEffect(() => {
    if (timeUp) {
      dispatch(setTimeUp(false));
      submitAndReset({ timeUp: true });
    }
  }, [timeUp, submitAndReset, finishRound, foundWords, dispatch]);

  const boardOps = { handleMouseLeaveBoard, handleMouseLeaveTile, 
                     handleMouseEvent, handleMouseUp };
  const boardTiles = board.map((letter, index) => {
    return <Tile key={`tile-${index}`} letter={letter} position={index} boardOps={boardOps} />
  });

  return (
    <>
      <div className='board-wrapper'>
        <h2>
          <ul className='tile-wrapper'>
            {boardTiles}
          </ul>    
        </h2>
      </div>
      <WordBank currentWord={currentWord} foundWords={foundWords} 
                submit={submitAndReset}
      />
    </>
  )
}

export default Board;
