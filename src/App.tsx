import React from 'react';
import './App.css';
import { LoadingIndicator } from './loading_indicator';
import { Clock } from './clock';
import { Grid as TicTacToe } from './tic-tac-toe';
import { Grid as ClickableGrid } from './clickable-grid';

function App() {
  return (
    <div>
      <div style={{ maxWidth: '80%', margin: '20px' }}>
        <LoadingIndicator />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Clock />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TicTacToe size={9} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <ClickableGrid rows={10} cols={10} />
      </div>
    </div>
  );
}

export default App;
