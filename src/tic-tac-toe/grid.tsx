import React, { useMemo, useState, useEffect } from 'react';
import './grid.css';

interface Props {
  size: number;
}

enum Turn {
  CIRCLE,
  CROSS,
  EMPTY,
}

export const Grid = ({ size }: Props) => {
  const [turn, setTurn] = useState<Turn>(Turn.CROSS);
  const [grid, setGrid] = useState<Turn[][]>([]);
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push([Turn.EMPTY, Turn.EMPTY, Turn.EMPTY]);
    }
    setGrid(arr);
  }, []);

  const checkWon = (row: number, column: number) => {
    if (
      grid[row][0] === grid[row][1] &&
      grid[row][1] === grid[row][2] &&
      grid[row][0] !== Turn.EMPTY
    ) {
      setWon(true);
      return;
    }
    if (
      grid[0][column] === grid[1][column] &&
      grid[1][column] === grid[2][column]
    ) {
      setWon(true);
    }
    if (
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2] &&
      grid[1][1] !== Turn.EMPTY
    ) {
      setWon(true);
    }
    if (
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0] &&
      grid[1][1] !== Turn.EMPTY
    ) {
      setWon(true);
    }
  };

  const onClick = (row: number, column: number) => {
    const gridCpy = [...grid];
    if (gridCpy[row][column] !== Turn.EMPTY) {
      return;
    }
    gridCpy[row][column] = turn;
    setGrid(gridCpy);
    setTurn(turn === Turn.CROSS ? Turn.CIRCLE : Turn.CROSS);
    checkWon(row, column);
  };

  const gridCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < grid.length; i++) {
      const innr = grid[i];
      for (let j = 0; j < innr.length; j++) {
        const content = grid[i][j];
        let className = '';
        if (content === Turn.CROSS) {
          className = 'divX';
        } else if (content === Turn.CIRCLE) {
          className = 'circle';
        }
        cells.push(
          <div
            key={i * 3 + j}
            className="gridCell"
            onClick={() => onClick(i, j)}
          >
            <div className={className}></div>
          </div>
        );
      }
    }
    return cells;
  }, [grid]);

  return (
    <div className="grid">
      {won ? <div> Wohooo, game has been won </div> : gridCells}
    </div>
  );
};
