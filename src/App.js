import React from 'react';
import { Provider } from 'react-redux';
import styles from './style.css';
import store from './store';
import GameInfo from './components/GameInfo';
import GameBoard from './components/GameBoard';

const App = () => (
  <main>
    <Provider store={store}>
      <div className={styles.app}>
        <div className={styles.header}>
          <span className={styles.title}>Connect</span>
          <span className={styles.title}>Four</span>
        </div>
        <GameInfo />
        <GameBoard />
      </div>
    </Provider>
  </main>
);

export default App;
