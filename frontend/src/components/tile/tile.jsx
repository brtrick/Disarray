import '../../stylesheets/reset.css';
import '../../stylesheets/tile.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelected } from '../../actions/boardActions';

function Tile ({ letter, position, boardOps }) {
  const [gameActive, setGameActive] = useState(false);
  const [selected, setSelected] = useState(false); 
  const dispatch = useDispatch();

  const reset = useSelector (state => state.board.resetSelected);
  const socket = useSelector (state => state.socket.socket);

  useEffect( () => {
    if (!socket) return;
    socket.on("startGame", () => setGameActive(true));
    socket.on("endGame", () => setGameActive(false));
    return () => {
      socket.off("startGame", () => setGameActive(true));
      socket.off("endGame", () => setGameActive(false));
    }
  }, [socket]);

  if (reset && selected) setSelected(false);

  const handlePointerLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    if (([0,   4,  8, 12].includes(position) && (e.nativeEvent.offsetX < 0)) || //exit left side
        ([0,   1,  2,  3].includes(position) && (e.nativeEvent.offsetY < 0)) || //exit top
        ([3,   7, 11, 15].includes(position) && (e.nativeEvent.offsetX >  e.currentTarget.offsetWidth)) || //exit right
        ([12, 13, 14, 15].includes(position) && (e.nativeEvent.offsetY >= e.currentTarget.offsetHeight))) //exit bottom
    {
      boardOps.handlePointerLeaveBoard();
    }
    else
      boardOps.handlePointerLeaveTile(setSelected);
  }

  useEffect(() => {
    // Specify position because only need to dispatch once
    if (reset && position === 0) dispatch(resetSelected(false))
  }, [reset, position, dispatch]);

  return (
    <li  
      {...(gameActive && {
          onTouchStart: (e) => {e.preventDefault(); e.stopPropagation(); boardOps.handlePointerEvent(e.type, letter, position, selected, setSelected)},
          onPointerDown: (e) => {e.preventDefault(); e.stopPropagation(); boardOps.handlePointerEvent(e.type, letter, position, selected, setSelected)},
          onTouchMove: (e) => {e.preventDefault(); e.stopPropagation(); boardOps.handlePointerEvent(e.type, letter, position, selected, setSelected)},
          onPointerEnter: (e) => {e.preventDefault(); e.stopPropagation(); boardOps.handlePointerEvent(e.type, letter, position, selected, setSelected)},
          onTouchEnd: (e) => {e.preventDefault(); e.stopPropagation(); boardOps.handlePointerUp(position, selected)},
          onPointerUp: (e) => {e.preventDefault(); e.stopPropagation(); boardOps.handlePointerUp(position, selected)},
          onPointerLeave: handlePointerLeave
      })}
      className={'tile' + (selected ? ' selected' : '')}
    >
          <p className='letter'>{letter}</p>
    </li>
  )
}

export default Tile;
