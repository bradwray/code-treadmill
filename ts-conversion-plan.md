# TypeScript Conversion Plan

## Goals
- Convert the full Code Treadmill codebase to TypeScript while keeping feature parity.
- Incrementally migrate modules so the app compiles at each stage.
- Adopt helpful type coverage without enforcing ultra-strict settings (`noImplicitAny` can remain off initially).

## Approach
- Bootstrap TypeScript support in Next.js (tsconfig, typings, dependency updates) before renaming files.
- Migrate core utilities and shared state first to establish reusable types.
- Progress through UI components and pages in dependency order, validating the build after each major chunk.
- Replace remaining `.js` files with `.ts`/`.tsx`, introducing interfaces/types where they add clarity.
- Track open questions and follow-ups as TODO items for future refinement.

## Phase Breakdown

### Phase 1 – Environment Setup
- [ ] Install TypeScript runtime deps: `typescript @types/react @types/node`
- [ ] Add typing helpers that unlock key libs (e.g. `@types/styled-components`, `@types/socket.io-client`)
- [ ] Create `tsconfig.json` tuned for a relaxed initial pass (`strict` false, `skipLibCheck` true)
- [ ] Let Next.js generate base TypeScript scaffolding; adjust `next.config.js` only if warnings appear
- [ ] Update lint/format tooling to recognise `.ts`/`.tsx` files (minimal changes to `.eslintrc.json`, `.prettierrc`, `.babelrc` as required)

### Phase 2A – Core Domain Types
- [x] Create `types/index.ts` with core interfaces:
  - `WorkoutSlide` (content, solveFor, complexity, tagsUsed, answerLength, etc.)
  - `AppStore` (currentIndex, readStats, raceID, slides, workout, rpm, etc.)
  - `RaceParticipant` (name, score, progress)
  - `Race` (raceWorkout, raceLang, participants, ended, began)
- [x] Define Socket.IO event interfaces for client-server communication:
  - Client to Server: `setRace`, `joinRace`, `raceStart`, `raceEnd`, `newResult`
  - Server to Client: `welcome`, `woops`, `raceBegan`, dynamic race updates
- [x] Define `WorkoutKey` type and a helper typing for dynamic workout imports
- [ ] TODO: consider consolidating workout imports into a registry once TypeScript baseline is stable

### Phase 2B – Utilities & Data
- [x] Convert utility files under `utils/` to `.ts`, using the new shared types.
- [x] Migrate workout data modules (`workouts/*.js`) to `.ts` with typed exports.
- [x] Update dynamic workout loader to return typed modules (without changing runtime behaviour).

### Phase 3 – Context & State Management
- [x] Convert `components/AppContext.js` to `.tsx`, typing the store shape, actions, and socket client.
- [x] Update context consumers to import the typed context.
- [ ] TODO: evaluate introducing a reducer or action typings for future robustness.

### Phase 4 – Shared UI Components
- [ ] Create basic theme interface (`Theme`, `ThemeStyle`) for styled-components
- [ ] Migrate reusable UI elements (`Button`, `CardContainer`, `Title`, etc.) to `.tsx`.
- [ ] Provide prop interfaces and default value typing where missing.
- [ ] Type styled-component props (theme, disabled, etc.)
- [ ] TODO: consider creating styled-components theme provider typing once stable.

### Phase 5 – Feature Components
- [ ] Convert functional components tied to workouts/races (`CodeRead`, `TreadMill`, `Panel`, `LeaderBoard`, etc.).
- [ ] Ensure proper React hook typing (useState, useEffect with specific generic types)
- [ ] Align socket event payloads with shared race types.
- [ ] Type component props and socket event handlers
- [ ] TODO: tighten socket event enums after confirming server contracts.

### Phase 6 – Pages & API Routes
- [x] Migrate Next pages under `pages/` to `.tsx`/`.ts`, updating `getInitialProps` or API handlers to typed signatures.
- [x] Type Next.js API handler parameters (`req: NextApiRequest`, `res: NextApiResponse`)
- [x] Convert API routes (e.g., `pages/api/socketio.js`) to TypeScript:
  - Type Socket.IO server setup and event handlers
  - Type the races object as `Record<string, Race>`
- [ ] TODO: assess whether Socket.IO server state should move to a dedicated module for typing reuse.

### Phase 7 – Verification & Cleanup
- [ ] Run the Next.js dev/build commands to ensure the TypeScript project compiles.
- [ ] Resolve remaining `any` usages where easy wins exist; capture harder cases as TODOs.
- [ ] Update documentation (README, repo overview) to mention TypeScript support.
- [ ] TODO: add CI or lint rule updates for `.ts` files if applicable.

## Tracking TODOs
- TODO: Strongly type dynamic workout imports → **IN PROGRESS**: add helper typings now, revisit registry post-migration
- TODO: Formalise Socket.IO event payload typing on both client and server → **COVERED**: Phase 2A
- TODO: Introduce theme typing for styled-components to remove implicit `any` theme usage → **ADDRESSED**: Include basic theme interface in Phase 4
- TODO: Evaluate state management refinements (context reducer, custom hooks) post-conversion.
- TODO: Consider stricter TypeScript settings (`strict: true`, `noImplicitAny: true`) after initial conversion
- TODO: Add CI or lint rule updates for `.ts` files if applicable
- TODO: Review and type all `useState` calls that currently lack proper generic types
- TODO: Evaluate whether complex theme system needs dedicated theme provider typing
