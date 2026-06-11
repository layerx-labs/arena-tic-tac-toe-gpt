import { describe, expect, it } from 'vitest';
import { applyMove, createEmptyBoard, getNextPlayer, getWinner, isDraw, type BoardState } from './game';

describe('tic-tac-toe game logic', () => {
  it('detects a row win', () => {
    const board: BoardState = ['X', 'X', 'X', null, 'O', null, 'O', null, null];

    expect(getWinner(board)).toEqual({ winner: 'X', line: [0, 1, 2] });
  });

  it('detects a column win', () => {
    const board: BoardState = ['O', 'X', null, 'O', 'X', null, 'O', null, 'X'];

    expect(getWinner(board)).toEqual({ winner: 'O', line: [0, 3, 6] });
  });

  it('detects a diagonal win', () => {
    const board: BoardState = ['X', 'O', null, 'O', 'X', null, null, null, 'X'];

    expect(getWinner(board)).toEqual({ winner: 'X', line: [0, 4, 8] });
  });

  it('detects a draw only when there is no winner', () => {
    const board: BoardState = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];

    expect(getWinner(board)).toBeNull();
    expect(isDraw(board)).toBe(true);
  });

  it('does not allow an occupied cell to be overwritten', () => {
    const board = createEmptyBoard();
    const withFirstMove = applyMove(board, 0, 'X');

    expect(applyMove(withFirstMove, 0, 'O')).toBe(withFirstMove);
    expect(withFirstMove[0]).toBe('X');
  });

  it('does not allow moves after a win', () => {
    const board: BoardState = ['X', 'X', 'X', null, 'O', null, null, null, 'O'];

    expect(applyMove(board, 3, 'O')).toBe(board);
  });

  it('alternates players', () => {
    expect(getNextPlayer('X')).toBe('O');
    expect(getNextPlayer('O')).toBe('X');
  });
});
