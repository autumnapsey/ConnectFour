import React from 'react';
import { Provider } from 'react-redux';
import styles from './style.css';
import store from './store';
import GameBoard from './components/GameBoard';

const App = () => (
  <main>
    <Provider store={store}>
      <div className={styles.app}>
        <div className={styles.header}>
          <h1 className={styles.title}>98point6 Drop Token</h1>
        </div>
        <GameBoard />
      </div>
    </Provider>
  </main>
);

export default App;
