// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import Token from './Token';
import styles from './Column.css';

const enhance = compose(
  connect(({ turnOrderSelection }) => ({ turnOrderSelection }), {
    addMove: col => ({
      type: 'ADD_PLAYER_MOVE',
      column: col,
    }),
  }),
  withHandlers({
    addToken: ({ addMove, turnOrderSelection }) => colNum => () => {
      if (turnOrderSelection) {
        addMove(colNum);
      }
    },
  }),
  withProps(({ colMoves }) => ({
    allColMoves: colMoves.concat(Array(4 - colMoves.length).fill('empty')),
  })),
);

const Column = ({
  colNum,
  addToken,
  allColMoves,
}: {
  colNum: number,
  addToken: Function,
  allColMoves: Array,
}) => (
  <div onClick={addToken(colNum)} className={styles.column} role="presentation">
    {allColMoves.map((player, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Token player={player} key={`${index}-${colNum}`} />
    ))}
  </div>
);

export default enhance(Column);
