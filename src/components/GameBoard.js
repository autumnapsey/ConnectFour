// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, lifecycle } from 'recompose';
import Column from './Column';
import styles from './GameBoard.css';
import fetchMove from '../actions/fetchMove';

const playerTurn = turnIndex =>
  turnIndex % 2 === 0 ? 'player-one' : 'player-two';

const enhance = compose(
  connect(({ moves, turnOrderSelection }) => ({ moves, turnOrderSelection }), {
    addComputerMove: computerMove => ({
      type: 'ADD_COMPUTER_MOVE',
      computerMove,
    }),
  }),
  lifecycle({
    componentDidUpdate() {
      if (
        (this.props.turnOrderSelection === 1 &&
          this.props.moves.length % 2 !== 0) ||
        (this.props.turnOrderSelection === 2 &&
          this.props.moves.length % 2 === 0)
      ) {
        const computerMove = fetchMove(this.props.moves.join(','));
        computerMove.then(res => this.props.addComputerMove(res));
      }
    },
  }),
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
