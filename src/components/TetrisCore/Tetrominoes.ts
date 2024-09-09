export const Tetrominoes = {
    I: [
      [[1, 1, 1, 1]],          // Horizontal
      [[1], [1], [1], [1]]     // Vertical
    ],
    J: [
      [[0, 0, 1], [1, 1, 1]],  // Original
      [[1, 0], [1, 0], [1, 1]],// Rotated 90 degrees
      [[1, 1, 1], [1, 0, 0]],  // Rotated 180 degrees
      [[1, 1], [0, 1], [0, 1]] // Rotated 270 degrees
    ],
    L: [
      [[1, 0, 0], [1, 1, 1]],  // Original
      [[1, 1], [1, 0], [1, 0]],// Rotated 90 degrees
      [[1, 1, 1], [0, 0, 1]],  // Rotated 180 degrees
      [[0, 1], [0, 1], [1, 1]] // Rotated 270 degrees
    ],
    O: [
      [[1, 1], [1, 1]]         // No rotation needed
    ],
    S: [
      [[0, 1, 1], [1, 1, 0]],  // Original
      [[1, 0], [1, 1], [0, 1]],// Rotated 90 degrees
      [[0, 1, 1], [1, 1, 0]],  // Rotated 180 degrees (same as original)
      [[1, 0], [1, 1], [0, 1]] // Rotated 270 degrees (same as 90 degrees)
    ],
    T: [
      [[0, 1, 0], [1, 1, 1]],  // Original
      [[1, 0], [1, 1], [1, 0]],// Rotated 90 degrees
      [[1, 1, 1], [0, 1, 0]],  // Rotated 180 degrees
      [[0, 1], [1, 1], [0, 1]] // Rotated 270 degrees
    ],
    Z: [
      [[1, 1, 0], [0, 1, 1]],  // Original
      [[0, 1], [1, 1], [1, 0]],// Rotated 90 degrees
      [[1, 1, 0], [0, 1, 1]],  // Rotated 180 degrees (same as original)
      [[0, 1], [1, 1], [1, 0]] // Rotated 270 degrees (same as 90 degrees)
    ]
  };
  