// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import TurnStatus from './TurnStatus';

const enhance = compose(
  connect(({ turnOrderSelection }) => ({ turnOrderSelection }), {
    selectTurnOrder: selection => ({
      type: 'SELECT_TURN_ORDER',
      selection,
    }),
  }),
  withHandlers({
    selectTurnOrder: ({ selectTurnOrder }) => selection => () =>
      selectTurnOrder(selection),
  }),
);

const GameInfo = ({
  selectTurnOrder,
  turnOrderSelection,
}: {
  selectTurnOrder: Function,
  turnOrderSelection: number,
}) => (
  <div>
    {turnOrderSelection === 0 ? (
      <div>
        Turn Order:
        <button onClick={selectTurnOrder(1)}>Player 1</button>
        <button onClick={selectTurnOrder(2)}>Player 2</button>
      </div>
    ) : (
      <span>You are Player {turnOrderSelection} </span>
    )}
    <TurnStatus />
  </div>
);

export default enhance(GameInfo);
