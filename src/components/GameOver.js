// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import styles from './GameBoard.css';

const endMessage = overMessage =>
  ({
    [true]: 'The game is over.',
    [overMessage === 'player-one']: 'Player 1 is the winner!',
    [overMessage === 'player-two']: 'Player 2 is the winner!',
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
  <div className={styles['gameOver-background']}>
    <div className={styles.container}>
      <div className={styles.message}>
        <div>{endMessage(gameOver)}</div>
        <button onClick={resetGame}>Play Again</button>
      </div>
    </div>
  </div>
);

export default enhance(GameOver);
