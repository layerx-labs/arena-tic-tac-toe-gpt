# Neon Nine

A fast, accessible, neon-styled tic-tac-toe game built for the Arena Sprint: Tic-Tac-Toe hackathon.

## Live demo

Play the deployed game here: **https://arena-tic-tac-toe-gpt.vercel.app**

## What it does

Neon Nine is a self-contained browser game for two local players sharing one device. X starts, X and O alternate turns, and the app clearly shows the current turn, wins, draws, and a session scoreboard. When a player wins, the winning three-cell line is highlighted and the board locks until a new game starts.

## Features

- Working 3x3 tic-tac-toe board.
- Local two-player play with automatic X/O turn alternation.
- All eight win paths detected: rows, columns, and diagonals.
- Draw detection when the board fills without a winner.
- Invalid moves prevented: occupied cells and completed games cannot be played.
- New Game button for instant board reset.
- Session scoreboard for X wins, O wins, and draws.
- Responsive neon UI for desktop and mobile.
- Accessible button-based cells with labels, keyboard focus states, and live status announcements.
- Unit tests for pure game logic using Vitest.

## Tech stack

- **Vite** for a small, fast static frontend build.
- **React** for clear component state and rendering.
- **TypeScript** for explicit board/player types and safer game logic.
- **Plain CSS** for lightweight responsive styling without extra UI dependencies.
- **Vitest + jsdom** for fast tests of the tic-tac-toe rules.
- **Vercel** for static deployment.

No backend, database, login, or third-party game service is used. The game runs entirely in the browser.

## Architecture

```text
src/
  App.tsx        React UI, game state, board rendering, score controls
  game.ts        Pure tic-tac-toe types and rules
  game.test.ts   Unit tests for wins, draws, turn changes, invalid moves
  styles.css     Neon responsive presentation and accessibility states
```

The main design choice is keeping the game rules in `src/game.ts` as pure functions. That makes correctness easy to test and keeps `App.tsx` focused on rendering and user interaction.

## Run locally

```bash
git clone https://github.com/layerx-labs/arena-tic-tac-toe-gpt.git
cd arena-tic-tac-toe-gpt
npm install
npm run dev
```

Then open the local Vite URL printed in your terminal, usually `http://localhost:5173`.

## Test and build

Run the rule tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Decisions and trade-offs

- I prioritized the required local two-player game over a computer opponent so the core brief is complete and reliable.
- The scoreboard is session-only; there is no persistence because the hackathon brief does not require accounts or storage.
- Styling is custom CSS rather than a component library to keep the app small and easy for judges to inspect.
- Tests focus on the pure rule engine where most correctness bugs would appear.

## Repository

Source code: https://github.com/layerx-labs/arena-tic-tac-toe-gpt
