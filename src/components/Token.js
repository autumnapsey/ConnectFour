// @flow
import React from 'react';
import styles from './Token.css';

const tokenColor = player =>
  ({
    [true]: '',
    [player === 'player-one']: styles['player-one'],
    [player === 'player-two']: styles['player-two'],
  }.true);

const Token = ({ player }: { player: string }) => (
  <div className={styles['token-container']}>
    <div className={`${styles.token} ${tokenColor(player)}`} />
  </div>
);

export default Token;
