// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing, withHandlers } from 'recompose';

const endMessage = overMessage =>
  ({
    [true]: 'The game is over.',
    [overMessage === 'player-one']: 'Player One is the winner!',
    [overMessage === 'player-two']: 'Player Two is the winner!',
    [overMessage === 'draw']: 'The game is a draw! All moves have been taken.',
  }.true);

const enhance = compose(
  connect(() => ({}), {
    resetMoves: () => ({
      type: 'RESET_MOVES',
    }),
    resetTurnOrderSelection: () => ({
      type: 'RESET_TURN_ORDER_SELECTION',
    }),
  }),
  branch(({ gameOver }) => !gameOver, renderNothing),
  withHandlers({
    resetGame: ({ resetMoves, resetTurnOrderSelection }) => () => {
      resetMoves();
      resetTurnOrderSelection();
    },
  }),
);

const GameOver = ({
  gameOver,
  resetGame,
}: {
  gameOver: string,
  resetGame: Function,
}) => (
  <div>
    {endMessage(gameOver)}
    <span>Game Over</span>
    <button onClick={resetGame}>Play Again</button>
  </div>
);

export default enhance(GameOver);
