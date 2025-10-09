import type { DefaultTheme } from 'styled-components';
import type { PrismTheme } from 'prism-react-renderer';

export type AppTheme = DefaultTheme & PrismTheme;

export interface WorkoutExercise {
  content: string;
  solveFor: string;
}

export interface CodeTag {
  tag: string;
  path: string;
  weight: number;
}

export interface WorkoutSlideRead {
  type: 'read';
  key?: number;
  content: string;
  solveFor: string;
  complexity: number;
  tagsUsed: CodeTag[];
  answerType: string;
  answerLength: number;
  done?: boolean;
}

export interface WorkoutSlideEnd {
  type: 'end';
}

export type WorkoutSlide = WorkoutSlideRead | WorkoutSlideEnd;

export interface ReadStat {
  correct: boolean;
  complexity?: number;
  time: number;
}

export interface RaceParticipant {
  name: string;
  score: number | string;
  progress: number | string;
}

export interface RaceState {
  raceWorkout: string;
  raceLang: string;
  participants: Record<string, RaceParticipant>;
  ended: boolean | string;
  began?: string;
}

export type RaceRegistry = Record<string, RaceState>;

export type WorkoutKey = string;

export interface WorkoutModule {
  default: WorkoutExercise[];
}

export interface AppStore {
  currentIndex: number;
  readStats: ReadStat[];
  raceID: string | null | false;
  slides: WorkoutSlide[];
  workout: string;
  raceWorkout?: string;
  rpm: number | string;
  avgComplexity: number | string;
  theme: AppTheme;
  themeName: string;
  themeType?: string;
  themeNum: number;
  leftAligned: boolean;
  score: number | string;
  raceLang?: string;
  userName?: string;
  confettiKey?: number;
  startTime?: string;
  endTime?: string;
  progress?: number | string;
  raceStats?: unknown[];
}

export type RaceUpdateEvent = `${string}-updateRace`;
export type RaceEndedEvent = `${string}-raceEnded`;

export interface ClientToServerEvents {
  setRace: (raceWorkout: string, raceID: string, raceLang: string) => void;
  joinRace: (raceID: string, userName: string) => void;
  raceStart: (raceID: string, startTime: string) => void;
  raceEnd: (raceID: string, endTime: string) => void;
  newResult: (raceID: string, userName: string, newResult: RaceParticipant) => void;
}

export interface ServerToClientEvents {
  welcome: (userName: string) => void;
  woops: (userName: string) => void;
  raceBegan: (raceID: string, startTime: string, raceRoute: string) => void;
  'a user connected': () => void;
  [event: string]: (...args: unknown[]) => void;
}
