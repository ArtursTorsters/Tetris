import React, { useEffect, useRef, useState } from 'react';
import { TETROMINOS, getRandomTetromino } from './Tetrominoes'; // Import Tetrominoes

interface TetrisGameProps {
  setScore: React.Dispatch<React.SetStateAction<number>>; // Prop for setting the score
}

const TetrisGame: React.FC<TetrisGameProps> = ({ setScore }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tetromino, setTetromino] = useState<number[][]>(getRandomTetromino());
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 4, y: 0 }); // Initial position
  const [isGameRunning, setIsGameRunning] = useState(true);
  const blockSize = 30; // Size of each block
  const gridWidth = 10; // Width of the game grid (in blocks)
  const gridHeight = 20; // Height of the game grid (in blocks)
  
  // Draw Tetromino
  const drawTetromino = (ctx: CanvasRenderingContext2D, tetromino: number[][], position: { x: number; y: number }) => {
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height); // Clear the canvas

    // Draw Tetromino
    ctx.fillStyle = 'cyan'; // Example color
    tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillRect((x + position.x) * blockSize, (y + position.y) * blockSize, blockSize, blockSize);
        }
      });
    });
  };

  // Rotate Tetromino
  const rotateTetromino = (tetromino: number[][]): number[][] => {
    const n = tetromino.length;
    const rotated: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        rotated[x][n - 1 - y] = tetromino[y][x];
      }
    }
    return rotated;
  };

  // Check if Tetromino is within bounds
  const isValidMove = (tetromino: number[][], position: { x: number; y: number }) => {
    return tetromino.every((row, y) => 
      row.every((value, x) => 
        !value || 
        (position.x + x >= 0 && 
         position.x + x < gridWidth && 
         position.y + y < gridHeight)
      )
    );
  };

  // Handle Tetromino rotation
  const handleRotation = () => {
    const rotated = rotateTetromino(tetromino);
    if (isValidMove(rotated, position)) {
      setTetromino(rotated);
    }
  };

  // Move Tetromino
  const moveTetromino = (newPosition: { x: number; y: number }) => {
    if (isValidMove(tetromino, newPosition)) {
      setPosition(newPosition);
    }
  };

  // Handle key presses
  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        moveTetromino({ x: position.x - 1, y: position.y });
        break;
      case 'ArrowRight':
        moveTetromino({ x: position.x + 1, y: position.y });
        break;
      case 'ArrowDown':
        moveTetromino({ x: position.x, y: position.y + 1 });
        break;
      case 'ArrowUp':
        handleRotation();
        break;
    }
  };

  // Drop Tetromino
  const dropTetromino = () => {
    const newPos = { x: position.x, y: position.y + 1 };
    if (isValidMove(tetromino, newPos)) {
      setPosition(newPos);
    } else {
      // Lock Tetromino and generate a new one
      setTetromino(getRandomTetromino());
      setPosition({ x: 4, y: 0 }); // Reset position
      // Update score (example logic, adjust as needed)
      setScore(prevScore => prevScore + 10);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameRunning) {
        dropTetromino();
      }
    }, 1000); // Adjust falling speed here (in milliseconds)
    return () => clearInterval(interval);
  }, [tetromino, position, isGameRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, tetromino]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawTetromino(ctx, tetromino, position);
      }
    }
  }, [tetromino, position]);

  return (
    <canvas
      ref={canvasRef}
      width={gridWidth * blockSize}
      height={gridHeight * blockSize}
      className="w-full h-full"
    />
  );
};

export default TetrisGame;
