import React, { useState } from 'react';
import './App.css';
import { LoadingIndicator } from './loading_indicator';
import { Clock } from './clock';
import { Grid as TicTacToe } from './tic-tac-toe';
import { Grid as ClickableGrid } from './clickable-grid';
import { ImageSlider } from './image-slider';

enum Selection {
  None = 0,
  Clock = 1,
  TicTacToe,
  Grid,
  ImageSlider = 4,
}

function App() {
  const [selection, setSelection] = useState<Selection>(Selection.None);

  const onClick = (id: number) => {
    setSelection(id);
  };

  const onBackClick = () => {
    setSelection(Selection.None);
  };

  return (
    <body className="flex justify-center items-center min-h-screen bg-gray-200">
      {selection === Selection.None && (
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg w-80"
            onClick={() => onClick(Selection.Clock)}
          >
            Clock
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg w-80"
            onClick={() => onClick(Selection.TicTacToe)}
          >
            Tic Tac Toe
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg w-80"
            onClick={() => onClick(Selection.Grid)}
          >
            Clickable Grid
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg w-80"
            onClick={() => onClick(Selection.ImageSlider)}
          >
            Image Slider
          </button>
        </div>
      )}
      {selection !== Selection.None && (
        <div className="fixed top-4 left-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
            onClick={onBackClick}
          >
            ← Back
          </button>
        </div>
      )}
      {selection === Selection.Clock && (
        <div className="flex">
          <Clock />
        </div>
      )}
      {selection === Selection.TicTacToe && (
        <div className="flex">
          <TicTacToe size={9} />
        </div>
      )}
      {selection === Selection.Grid && (
        <div className="flex">
          <ClickableGrid rows={10} cols={10} />
        </div>
      )}
      {selection === Selection.ImageSlider && (
        <div className="flex">
          <ImageSlider />
        </div>
      )}
    </body>
  );
}

export default App;
