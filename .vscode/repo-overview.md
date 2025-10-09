# Code Treadmill (code-rpm) Overview

## Quick Start
- Install deps and run locally with `npm install` followed by `npm run dev`. The Next.js server boots on `localhost:3000`.
- All interactive state and theming live in the React context exported from `components/AppContext.js`. Page components wrap their trees in `<AppContext>` to ensure sockets, workouts, and themes initialise correctly.
- The multiplayer race socket server is created lazily by `pages/api/socketio.js`; hit `/api/socketio` once on app start (the UI pages do this automatically) so `socket.io` attaches to the Next.js HTTP server.

## High-Level Flow
- Landing on `/` renders `pages/index.js`, which composes two major surfaces: `components/Panel` (settings, stats, and race controls) and `components/TreadMill` (carousel of prompts).
- Workout selection pushes to the dynamic route `/[id]` (e.g. `/js-variables`). The `AppContext` hook sees the `route` prop, dynamically imports the matching workout from `/workouts`, tags each exercise via `utils/tagAndWeightCode.js`, and stores it in `store.slides`.
- Each workout slide is a code-reading prompt rendered by `components/CodeRead`. As you submit answers, the slide marks itself complete, updates RPM/complexity/score metrics, emits race progress if a race is active, and advances the carousel.
- The stats widgets (`components/ResultsDisplay` and `components/ProgressChart`) read from the shared store to show live RPM, average complexity, score, and per-question progress.

## Workout Content Pipeline
- Workout definitions are simple arrays in `workouts/*.js` with `content` and `solveFor` strings. Placeholder tokens (`##`, `@@`, `$$`, etc.) are expanded by `utils/fillItAndPrettify.js`, which randomises values and prettifies JavaScript with Prettier.
- `utils/tagAndWeightExercise.js` and `utils/codeTags.js` analyse each prompt to determine tags and a rough complexity score, later visualised in the progress chart and metadata panel.
- For AP CSP style workouts, `utils/jsToPseudoCode.js` translates generated JavaScript to the exam’s pseudocode dialect, assisted by the runtime shim in `utils/PseudoArray.js`.
- Answers are validated client-side with `utils/evalCode.js`, which safely evaluates the decorated snippet (with infinite-loop guards and pseudocode support).

## Multiplayer Racing
- Race creation lives in `components/RaceManage.js`, rendered on `/race-manager`. It generates a random animal-based race code, lets the host select a workout, and exposes start/end controls. Selections are broadcast via socket events (`setRace`, `raceStart`, `raceEnd`).
- Participants join from `/race` using `components/RaceJoin.js`, entering a display name and race code. When the host starts the race, clients navigate automatically to the workout route with `raceID` and `uName` query parameters so `AppContext` can sync context state.
- During a race, `CodeRead` emits `newResult` over sockets after each correct answer. `components/LeaderBoard.js` listens for `${raceID}-updateRace` and re-renders the standings. Race end broadcasts `${raceID}-raceEnded`, clearing the context state and stamping `endTime`.
- Socket lifecycle and shared race state are managed centrally by `pages/api/socketio.js`. The handler captures race metadata (workout, participants, progress) in-memory while the Next.js process stays alive.

## UI and Theming
- Styling uses `styled-components` with SSR support wired in `pages/_document.js`. Theme options live in `themes/themeOptions.js`; `components/ThemeDropdown.js` persists the selected theme index to `localStorage` and dynamically imports the theme bundle.
- `utils/hexThemeColors.js` normalises Prism theme colour strings into hex so they can be reused across custom components (progress bars, digital readouts, etc.).
- Layout adapts via `store.leftAligned`. `Panel` can pin itself on the left or top; toggled layout cascades into conditional rendering of the embedded leaderboard.
- Visual flourishes such as confetti (`react-confetti`), animated titles, and attention callouts live inside dedicated components (`TreadMill`, `Title`, `Attention`).

## Workout Maker
- `/workout-maker` exposes `components/QuestionMaker.js`, allowing authors to type a prompt (`CodeWrite`) and immediately test it using the same `CodeRead` component in “maker” mode. Successful entries are staged locally (`state.items`) and ready to be copied into a workout file.
- `components/SpecialChars.js` documents placeholder tokens so creators can produce parameterised prompts that remain randomised across sessions.

## Key Files and Modules
- `components/AppContext.js`: centralised state, dynamic workout/theme loading, socket instance.
- `components/TreadMill.js` and `components/Slide.js`: carousel logic for active prompts and end-of-workout menu.
- `pages/api/socketio.js`: socket server, race-state registry, event contracts (`setRace`, `joinRace`, `newResult`, `raceStart`, `raceEnd`).
- `utils/fillItAndPrettify.js`: placeholder substitution + Prettier formatting; imported nearly everywhere code strings are displayed or evaluated.
- `workouts/*.js`: workout source data; groupings for JavaScript and pseudocode skill tracks.

## Development Notes
- The repo targets Node 17.x with Next 12 and React 17; ensure compatibility when upgrading dependencies.
- Socket state is held entirely in-memory. Restarting the dev server clears active races; production deployments on serverless platforms need sticky instances or an external race store.
- Race metrics derive from client-issued `Date.now()` timestamps. For competitive fairness, consider server authoritative timing if you evolve the race mode.
- There is minimal input sanitisation beyond simple replacements in `evalCode.js`; keep that in mind if you extend to user-generated workouts.

