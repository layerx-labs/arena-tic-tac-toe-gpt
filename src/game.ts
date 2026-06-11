export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export type WinnerResult = {
  winner: Player;
  line: number[];
} | null;

export const BOARD_SIZE = 9;

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function createEmptyBoard(): BoardState {
  return Array<CellValue>(BOARD_SIZE).fill(null);
}

export function getWinner(board: BoardState): WinnerResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const mark = board[a];

    if (mark && mark === board[b] && mark === board[c]) {
      return { winner: mark, line: [...line] };
    }
  }

  return null;
}

export function isDraw(board: BoardState): boolean {
  return board.every(Boolean) && !getWinner(board);
}

export function getNextPlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

export function applyMove(board: BoardState, index: number, player: Player): BoardState {
  if (index < 0 || index >= BOARD_SIZE || board[index] || getWinner(board) || isDraw(board)) {
    return board;
  }

  const nextBoard = [...board];
  nextBoard[index] = player;
  return nextBoard;
}
