module.exports = function solveSudoku(matrix) {
  
  let zeroLocation;
  let row = 0;
  let col = 0;

  function checkNumberPosition(matrix, row, col, number) {

    for (let i = 0; i < 9; i++)
      if (matrix[i][col] === number) return false;

    for (let j = 0; j < 9; j++)
      if (matrix[row][j] === number) return false;

    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (matrix[row + i][col + j] === number) return false;

    return true;
  }

  function findZeroLocation(matrix, row, col) {

    bufZeroLocation = [-1, -1];

    while (true) {
      if (row === matrix.length) break;
      if (matrix[row][col] === 0) {
        bufZeroLocation[0] = row;
        bufZeroLocation[1] = col;
        break;
      }
      else {
        if (col < matrix.length - 1) col++;
        else {
          row++;
          col = 0;
        }
      }
    }

    return bufZeroLocation;
  }

  function recursionSolveSudoku(matrix, row, col) {

    zeroLocation = findZeroLocation(matrix, row, col);

    row = zeroLocation[0];
    col = zeroLocation[1];

    if (row == -1) return true;

    for (let number = 1; number <= 9; number++) {
      if (checkNumberPosition(matrix, row, col, number)) {
        matrix[row][col] = number;

        if (recursionSolveSudoku(matrix, row, col)) return true;

        matrix[row][col] = 0;
      }
    }

    return false;
  }

  recursionSolveSudoku(matrix, row, col)

  return matrix;
}
