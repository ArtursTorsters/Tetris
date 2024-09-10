import React, { useEffect, useRef, useState } from "react";
import { TETROMINOS, getRandomTetromino } from "./Tetrominoes";

interface TetrisGameProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const TetrisGame: React.FC<TetrisGameProps> = ({ setScore }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tetromino, setTetromino] = useState<number[][]>(getRandomTetromino());
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  }); // start positon for tetromino
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [grid, setGrid] = useState<number[][]>(
    Array.from({ length: 20 }, () => Array(10).fill(0))
  );
  const blockSize = 40;
  const gridWidth = 10;
  const gridHeight = 20;

  // Draw the entire grid
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height); // Clear the canvas

    // Draw grid blocks
    grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillStyle = "gray"; // Color for placed blocks
          ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
        }
      });
    });
  };

  // Rotate Tetromino
  const rotateTetromino = (tetromino: number[][]): number[][] => {
    const n = tetromino.length;
    const rotated: number[][] = Array.from({ length: n }, () =>
      Array(n).fill(0)
    );

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        rotated[x][n - 1 - y] = tetromino[y][x]; // rotate 90 degrees
      }
    }

    return rotated;
  };

  // Check if Tetromino is within bounds and not colliding
  const isValidMove = (
    tetromino: number[][],
    position: { x: number; y: number }
  ): boolean => {
    return tetromino.every((row, y) =>
      row.every(
        (value, x) =>
          !value ||
          (position.x + x >= 0 &&
            position.x + x < gridWidth &&
            position.y + y < gridHeight &&
            grid[position.y + y][position.x + x] === 0)
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

  // Lock Tetromino and generate a new one
  const lockTetromino = () => {
    const newGrid = grid.map((row) => row.slice());
    tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          newGrid[position.y + y][position.x + x] = value;
        }
      });
    });

    // if lines ar complete
    const newScore = grid.reduce((score, row) => {
      if (row.every((value) => value !== 0)) {
        const audio = new Audio("/audio/clear.mp3");
        audio.volume = 0.9;

        audio.play();

        // Clear line and move rows down
        newGrid.unshift(Array(gridWidth).fill(0));
        newGrid.pop();

        score += 100; // if line completed add 100 points
      }
      return score;
    }, 0);

    setGrid(newGrid);
    setScore((prevScore) => prevScore + newScore);
    setTetromino(getRandomTetromino());
    setPosition({ x: 4, y: 0 });
  };

  // Drop Tetromino
  const dropTetromino = () => {
    const newPos = { x: position.x, y: position.y + 1 };
    if (isValidMove(tetromino, newPos)) {
      setPosition(newPos);
    } else {
      const audio = new Audio("/audio/block.mp3");
      audio.volume = 0.4;

      audio.play();

      lockTetromino();
    }
  };

  // Handle key presses
  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        moveTetromino({ x: position.x - 1, y: position.y });
        break;
      case "ArrowRight":
        moveTetromino({ x: position.x + 1, y: position.y });
        break;
      case "ArrowDown":
        dropTetromino();
        break;
      case "ArrowUp":
        handleRotation();
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameRunning) {
        dropTetromino();
      }
    }, 1000); // Falling speed
    return () => clearInterval(interval);
  }, [tetromino, position, isGameRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position, tetromino]);

  // Draw Tetromino the one are falling
  const drawTetromino = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "cyan"; // Example color
    tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillRect(
            (x + position.x) * blockSize,
            (y + position.y) * blockSize,
            blockSize,
            blockSize
          );
        }
      });
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawGrid(ctx); // Draw the grid first
        drawTetromino(ctx);
      }
    }
  }, [tetromino, position, grid]);

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
