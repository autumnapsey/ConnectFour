// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, lifecycle } from 'recompose';
import Column from './Column';
import styles from './GameBoard.css';
import fetchMove from '../actions/fetchMove';
import GameOver from './GameOver';

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
    columnWin: board =>
      board
        .map(
          col =>
            // eslint-disable-next-line no-nested-ternary
            col.length === 4
              ? col.every(move => move === col[0]) ? col[0] : false
              : false,
        )
        .find(winner => winner !== false),
    diagonalAscendingWin: board =>
      board.map((col, index) => col[index]).every(move => move === board[0][0])
        ? board[0][0]
        : false,
  })),
  withProps(({ columnWin, diagonalAscendingWin, boardMoves }) => ({
    rowWin: board =>
      columnWin(board[0].map((col, i) => board.map(row => row[i]))),
    diagonalDescendingWin: board =>
      diagonalAscendingWin(board.reduce((acc, curr) => [curr, ...acc], [])),
    gameDraw:
      boardMoves.reduce((acc, cur) => [...acc, ...cur], []).length >= 16
        ? 'draw'
        : false,
  })),
  withProps(
    ({
      boardMoves,
      columnWin,
      diagonalAscendingWin,
      rowWin,
      diagonalDescendingWin,
      gameDraw,
    }) => ({
      gameOver:
        columnWin(boardMoves) ||
        rowWin(boardMoves) ||
        diagonalAscendingWin(boardMoves) ||
        diagonalDescendingWin(boardMoves) ||
        gameDraw,
    }),
  ),
);

const GameBoard = ({
  boardMoves,
  gameOver,
}: {
  boardMoves: Array,
  gameOver: string,
}) => (
  <div className={styles.board}>
    <GameOver gameOver={gameOver} />
    {boardMoves.map((col, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Column colMoves={col} key={`col-${index}`} colNum={index} />
    ))}
  </div>
);

export default enhance(GameBoard);
