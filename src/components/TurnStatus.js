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

const TurnStatus = ({ playerTurn }: { playerTurn: number }) => (
  <div>Waiting for {playerTurn} to take their turn.</div>
);

export default enhance(TurnStatus);
