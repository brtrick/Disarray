import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/modalActions';

export function GameRulesButton () {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(openModal('game-rules'))} className='submit game-rules-link'>Game Rules</button>;
}

export function InputRulesButton () {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(openModal('word-rules'))} className='submit word-rules-link'>Input Rules</button>;
}
