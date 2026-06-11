# PLAN.md — Arena Sprint Tic-Tac-Toe

## Project idea

**Project name:** Neon Nine

**Tagline:** A fast, accessible, neon-styled browser tic-tac-toe board with rock-solid local play.

**Concrete idea:** Build a single-page tic-tac-toe web app focused on flawless gameplay, instant loading, and a polished but simple presentation. Two local players share one device; the app clearly shows whose turn it is, highlights the winning line, detects draws, tracks a lightweight session score, and offers a one-click reset/new game. A simple optional “vs Computer” mode can be added only after the local two-player game is complete and tested.

The winning strategy for this hackathon is not feature breadth; it is shipping a reliable, attractive, easy-to-review game with clean code, clear README, public repo, and public demo.

---

## Problem and target user

### Problem
The hackathon asks for a playable browser tic-tac-toe game. Many submissions may fail on edge cases, unclear state, poor reset behavior, inaccessible UI, or missing deployment/writeup details. The goal is to deliver a small game that judges can open and trust within seconds.

### Target user
- **Primary:** Hackathon judges who need to quickly verify gameplay, code quality, deployment, and documentation.
- **Secondary:** Any casual user who wants to play tic-tac-toe locally with another person on the same browser.

---

## Core features

### Must-have features for eligibility and scoring
1. **3x3 tic-tac-toe board**
   - Nine clickable cells.
   - Clear X/O marks.
   - Prevents playing in an occupied cell.

2. **Two-player local play**
   - X starts.
   - Players alternate turns automatically.
   - Current player is always displayed.

3. **Win detection**
   - Detect all 8 winning lines: 3 rows, 3 columns, 2 diagonals.
   - Immediately stop additional moves after a win.
   - Clearly show winner.
   - Visually highlight the winning line.

4. **Draw detection**
   - Detect full board with no winner.
   - Clearly show draw state.

5. **New game / reset**
   - Reset board and game state without page refresh.
   - Preserve optional session score if implemented.
   - Provide a separate score reset only if score is added.

6. **Responsive and accessible UI**
   - Works on desktop and mobile widths.
   - Buttons/cells have accessible labels.
   - Keyboard-accessible board controls if feasible in the selected framework.
   - Sufficient color contrast and non-color-only status text.

7. **Clear documentation**
   - README explains what it is, how to run locally, tech used, and trade-offs.
   - TAIKAI project description can reuse concise sections from README/PLAN.

### Nice-to-have features only after must-haves are complete
1. **Session scoreboard**
   - X wins, O wins, draws.
   - Adds polish without risking the core.

2. **Mode toggle: Local / Computer**
   - Computer plays simple valid moves.
   - Prefer a safe minimax or immediate-win/block strategy only if time permits.
   - This must not complicate or destabilize local play.

3. **Theme polish**
   - Neon gradient background.
   - Smooth cell hover/focus states.
   - Subtle win animation.

---

## Tech stack

1. **Vite**
   - Fast, minimal frontend setup with simple static build output; ideal for a small browser game.

2. **React**
   - Clean component/state model for board cells, status, controls, and deterministic game logic.

3. **TypeScript**
   - Helps prevent simple state and function mistakes; improves readability for judges reviewing code.

4. **CSS Modules or plain CSS**
   - Lightweight styling without adding dependency risk; enough for responsive neon UI.

5. **Vitest**
   - Small, fast unit tests for winner/draw/turn logic, which supports the “works” and “craft” criteria.

6. **GitHub Pages or Vercel/Netlify**
   - Static deployment with public URL. Use the path of least resistance in build phase; Vercel/Netlify is preferred if available because Vite deploys cleanly.

---

## Architecture

### Frontend
Single-page React app.

Proposed component structure:
- `App` — owns high-level state and layout.
- `Board` — renders 3x3 grid and passes cell clicks upward.
- `Cell` — accessible button for each square.
- `StatusPanel` — current turn, winner, draw, and optional scoreboard.
- `Controls` — new game and optional score reset/mode toggle.

Game logic should live in a small pure module, e.g. `game.ts`:
- `calculateWinner(board)` returns winner and winning line.
- `isDraw(board)` returns draw boolean.
- `nextPlayer(board)` or explicit turn state.
- Optional `getComputerMove(board, player)` if vs-computer is added.

Keeping logic pure makes it easy to test and review.

### Backend
No backend. The app is entirely static and self-contained.

### Data
No persistent database. Game state is in React state only:
- `board`: 9-value array of `X`, `O`, or `null`.
- `currentPlayer`: `X` or `O`.
- `winner`: derived or stored after each move.
- `winningLine`: indexes for visual highlight.
- `draw`: derived from board + winner.
- Optional `score`: session-only counts for X, O, draws.
- Optional `mode`: `local` or `computer`.

### Deploy
Build static assets with `npm run build` and deploy the generated output to a public URL. The repository is fixed as:

`https://github.com/layerx-labs/arena-tic-tac-toe-gpt`

The final TAIKAI project should put:
- **Code field:** GitHub repository URL.
- **Demo field:** Public deployed app URL.

---

## Rubric mapping

### 1. It works — 40%
Plan to maximize this score:
- Implement the required 3x3 board first.
- Use a pure `calculateWinner` function with all 8 winning combinations.
- Disable occupied cells and disable board after game over.
- Show explicit status text for X turn, O turn, X wins, O wins, and draw.
- Add tests for:
  - row win,
  - column win,
  - diagonal win,
  - draw without winner,
  - no move into occupied square/game-over behavior at UI or logic level if practical.
- Manually test the deployed URL in browser before submission.

### 2. Craft — 30%
Plan to maximize this score:
- Keep code small and organized by components plus pure game logic.
- Use TypeScript types for players, cells, board, and result.
- Write descriptive names instead of clever abstractions.
- Add incremental commits in build phase, for example:
  1. scaffold app,
  2. add game logic,
  3. add UI board/status,
  4. add reset/score/tests,
  5. polish styles and README,
  6. deploy config.
- Avoid overengineering, global state libraries, backend, or unnecessary packages.

### 3. Shipped — 20%
Plan to maximize this score:
- Push source to the required public GitHub repo: `layerx-labs/arena-tic-tac-toe-gpt`.
- Deploy a static build to a public URL.
- Verify both repo and demo are reachable in an incognito/private window if possible.
- Ensure TAIKAI project Code and Demo fields are filled correctly in the final submission phase.

### 4. Writeup — 10%
Plan to maximize this score:
- README includes:
  - project name and short description,
  - live demo link,
  - screenshots or brief usage instructions if easy,
  - local setup commands,
  - tech stack,
  - game rules/features,
  - decisions/trade-offs,
  - testing/deployment notes.
- TAIKAI project description uses clear HTML sections:
  - what it is,
  - how to play,
  - implementation notes,
  - what was prioritized.

---

## Build phase milestones

1. **Repository and scaffold**
   - Initialize Vite React TypeScript app in `/workspace`.
   - Confirm scripts work locally.
   - Commit scaffold.

2. **Pure game logic**
   - Add board/player types.
   - Implement winner and draw detection.
   - Add unit tests for core outcomes.
   - Commit logic and tests.

3. **Playable local game UI**
   - Render responsive 3x3 board.
   - Alternate X/O turns.
   - Prevent invalid moves.
   - Display status.
   - Commit playable version.

4. **Game-over behavior and reset**
   - Highlight winning line.
   - Stop moves after win/draw.
   - Add New Game button.
   - Add optional session scoreboard if time permits.
   - Commit completed core.

5. **Polish and accessibility**
   - Add neon visual theme.
   - Improve focus states, labels, contrast, and mobile layout.
   - Manually test common win/draw paths.
   - Commit polish.

6. **README and deployment**
   - Write README with run instructions and trade-offs.
   - Deploy public demo.
   - Verify repo/demo links.
   - Commit documentation/deploy config.

7. **Submission prep**
   - Prepare TAIKAI project name, tagline, and HTML description.
   - Ensure Code and Demo fields are ready.

---

## Definition of done

The project is done when:

- The browser app loads from a public URL.
- A user can play a complete local two-player tic-tac-toe game.
- X and O alternate correctly.
- Occupied cells cannot be overwritten.
- All row, column, and diagonal wins are detected correctly.
- Draws are detected correctly.
- The result and current turn are clearly displayed.
- New Game resets the board correctly.
- The source is pushed to `layerx-labs/arena-tic-tac-toe-gpt`.
- README explains what the app is, how to run it, tech choices, and trade-offs.
- TAIKAI project has the GitHub repo in Code and live URL in Demo.

## Risk management

- If deployment is difficult, switch to the simplest static host available rather than adding features.
- If TypeScript or tests slow progress, keep TypeScript but reduce test scope to winner/draw logic.
- Do not add computer mode until the required two-player game is complete, tested, documented, and deployable.
- Prioritize correctness and shipping over animations or extra options.
