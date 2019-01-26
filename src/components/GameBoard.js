// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import Column from './Column';
import styles from './GameBoard.css';

const playerTurn = turnIndex =>
  turnIndex % 2 === 0 ? 'player-one' : 'player-two';

const enhance = compose(
  connect(({ moves, turnOrderSelection }) => ({ moves, turnOrderSelection })),
  withProps(({ moves }) => ({
    boardMoves: Array(4)
      .fill([])
      .map(
        (col, index) =>
          moves.length
            ? moves
                .map((move, i) => (move === index ? playerTurn(i) : move))
                .filter(move => typeof move === 'string')
            : [],
      ),
  })),
);

const GameBoard = ({ boardMoves }: { boardMoves: Array }) => (
  <div className={styles.board}>
    {boardMoves.map((col, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Column colMoves={col} key={`col-${index}`} colNum={index} />
    ))}
  </div>
);

export default enhance(GameBoard);
