import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, lifecycle } from 'recompose';
import Column from './Column';
import fetchMove from '../actions/fetchMove';
import styles from './GameBoard.css';

const enhance = compose(
  connect(({ moves }) => ({ moves })),
  lifecycle({
    componentDidMount() {
      fetchMove('[0]');
    },
  }),
  withProps(moves => ({
    moves,
  })),
);

const GameBoard = moves => (
  <div className={styles.board}>
    {moves.length}
    <Column />
    <Column />
    <Column />
    <Column />
  </div>
);

export default enhance(GameBoard);
