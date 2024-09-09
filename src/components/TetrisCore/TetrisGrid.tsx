import React from 'react';
import { Tetrominoes } from './Tetrominoes';

// Example Tetromino Component
const TetrisGrid: React.FC<{ grid: number[][], tetromino: number[][], position: { x: number, y: number } }> = ({ grid, tetromino, position }) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const displayGrid = grid.map(row => [...row]);

  // Overlay the Tetromino on the grid
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      if (tetromino[y][x]) {
        const gridX = position.x + x;
        const gridY = position.y + y;
        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
          displayGrid[gridY][gridX] = tetromino[y][x];
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-10 gap-1">
      {displayGrid.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className={`w-8 h-8 ${cell ? 'bg-blue-500' : 'bg-gray-200'} border border-gray-400`}
          ></div>
        ))
      )}
    </div>
  );
};

export default TetrisGrid;
