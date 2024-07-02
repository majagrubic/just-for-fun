import { useState, useEffect, useRef } from 'react';
import './grid.css';

export function Grid({ rows, cols }: { rows: number; cols: number }) {
  const [clicked, setClicked] = useState(new Set());
  const timeoutsRef = useRef({});

  const onCellClick = (rowIndex: number, cellIndex: number) => {
    const id = rowIndex * 10 + cellIndex;
    setClicked((prevClicked) => {
      // Create a copy of the current state
      const updatedCells = new Set(prevClicked);
      updatedCells.add(id);
      return updatedCells;
    });

    //@ts-ignore
    if (timeoutsRef.current[id]) {
      //@ts-ignore
      clearTimeout(timeoutsRef.current[id]);
    }

    // @ts-ignore
    timeoutsRef.current[id] = setTimeout(() => {
      setClicked((prevClicked) => {
        // Create a copy of the current state
        const updatedCells = new Set(prevClicked);
        updatedCells.delete(id);
        return updatedCells;
      });
      //@ts-ignore
      delete timeoutsRef.current[id];
    }, 10000);
  };

  useEffect(() => {
    return () => {
      // @ts-ignore
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  const generateCols = (rowIndex: number) => {
    return Array(cols)
      .fill(0)
      .map((col, index) => {
        const id = rowIndex * 10 + index;
        const isCellClicked = clicked.has(id);
        return (
          <div
            key={id}
            className="cell"
            style={isCellClicked ? { backgroundColor: 'red' } : {}}
            onClick={() => onCellClick(rowIndex, index)}
          ></div>
        );
      });
  };

  const generateRows = () => {
    return Array(rows)
      .fill(0)
      .map((row, index) => {
        return <div className="row">{generateCols(index)}</div>;
      });
  };

  return <div>{generateRows()}</div>;
}
