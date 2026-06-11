import { useMemo, useState } from 'react';
import {
  applyMove,
  createEmptyBoard,
  getNextPlayer,
  getWinner,
  isDraw,
  type BoardState,
  type Player,
} from './game';

type Score = Record<Player | 'draws', number>;

const initialScore: Score = { X: 0, O: 0, draws: 0 };

function formatCellLabel(index: number, value: Player | null, gameOver: boolean) {
  const position = `row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`;

  if (value) {
    return `${position}: ${value}`;
  }

  return gameOver ? `${position}: empty, game over` : `${position}: empty`;
}

export default function App() {
  const [board, setBoard] = useState<BoardState>(() => createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [score, setScore] = useState<Score>(initialScore);

  const winnerResult = useMemo(() => getWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);
  const gameOver = Boolean(winnerResult) || draw;
  const winningLine = winnerResult?.line ?? [];

  const status = winnerResult
    ? `Player ${winnerResult.winner} wins!`
    : draw
      ? 'Game ended in a draw.'
      : `Player ${currentPlayer}'s turn`;

  function handleCellClick(index: number) {
    const nextBoard = applyMove(board, index, currentPlayer);

    if (nextBoard === board) {
      return;
    }

    const nextWinner = getWinner(nextBoard);
    const nextDraw = isDraw(nextBoard);

    setBoard(nextBoard);

    if (nextWinner) {
      setScore((currentScore) => ({
        ...currentScore,
        [nextWinner.winner]: currentScore[nextWinner.winner] + 1,
      }));
      return;
    }

    if (nextDraw) {
      setScore((currentScore) => ({ ...currentScore, draws: currentScore.draws + 1 }));
      return;
    }

    setCurrentPlayer((player) => getNextPlayer(player));
  }

  function startNewGame() {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
  }

  function resetScore() {
    setScore(initialScore);
    startNewGame();
  }

  return (
    <main className="app-shell">
      <section className="game-card" aria-labelledby="game-title">
        <header className="header">
          <p className="eyebrow">Arena Sprint</p>
          <h1 id="game-title">Neon Nine</h1>
          <p className="intro">
            A fast, accessible local tic-tac-toe board for two players sharing one browser.
          </p>
        </header>

        <section className="status-panel" aria-live="polite" aria-atomic="true">
          <p className="status-label">Game status</p>
          <p className="status-text">{status}</p>
          <div className="scoreboard" aria-label="Session scoreboard">
            <span>X wins: {score.X}</span>
            <span>O wins: {score.O}</span>
            <span>Draws: {score.draws}</span>
          </div>
        </section>

        <div className="board" role="grid" aria-label="Tic-tac-toe board">
          {board.map((value, index) => {
            const isWinningCell = winningLine.includes(index);
            return (
              <button
                aria-label={formatCellLabel(index, value, gameOver)}
                className={`cell ${value ? `cell-${value.toLowerCase()}` : ''} ${isWinningCell ? 'winning-cell' : ''}`}
                disabled={Boolean(value) || gameOver}
                key={index}
                onClick={() => handleCellClick(index)}
                role="gridcell"
                type="button"
              >
                <span aria-hidden="true">{value}</span>
              </button>
            );
          })}
        </div>

        <div className="controls">
          <button className="primary-action" onClick={startNewGame} type="button">
            New game
          </button>
          <button className="secondary-action" onClick={resetScore} type="button">
            Reset score
          </button>
        </div>
      </section>
    </main>
  );
}
