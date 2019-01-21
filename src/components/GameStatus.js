// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing, withProps } from 'recompose';

const enhance = compose(
  connect(({ moves, turnOrderSelection }) => ({ moves, turnOrderSelection })),
  branch(({ turnOrderSelection }) => turnOrderSelection === 0, renderNothing),
  withProps(({ moves }) => ({
    playerTurn: moves.length % 2 === 0 ? 1 : 2,
  })),
);

const GameStatus = ({ playerTurn }: { playerTurn: number }) => (
  <div>It is Player {playerTurn}s turn.</div>
);

export default enhance(GameStatus);
