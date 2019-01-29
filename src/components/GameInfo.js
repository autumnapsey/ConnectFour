// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import TurnStatus from './TurnStatus';
import styles from './GameInfo.css';

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
  <div className={styles['game-info']}>
    {turnOrderSelection === 0 ? (
      <div>
        Choose your turn order:
        <div>
          <button className={styles.one} onClick={selectTurnOrder(1)}>
            Player 1
          </button>
          <button className={styles.two} onClick={selectTurnOrder(2)}>
            Player 2
          </button>
        </div>
      </div>
    ) : (
      <div>You are Player {turnOrderSelection}. </div>
    )}
    <TurnStatus />
  </div>
);

export default enhance(GameInfo);
