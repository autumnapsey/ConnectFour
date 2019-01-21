import { combineReducers } from 'redux';
import moves from './moves';
import turnOrderSelection from './turnOrderSelection';

const rootReducer = combineReducers({
  moves,
  turnOrderSelection,
});

export default rootReducer;
