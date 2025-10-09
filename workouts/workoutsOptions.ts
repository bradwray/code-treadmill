export type WorkoutLanguage = 'js' | 'pseudo';

export interface WorkoutOption {
  lang: WorkoutLanguage;
  workout: string;
}

const workouts: WorkoutOption[] = [
  { lang: 'js', workout: 'variables' },
  { lang: 'js', workout: 'conditionals' },
  { lang: 'js', workout: 'functions' },
  { lang: 'js', workout: 'lists' },
  { lang: 'js', workout: 'loops' },
  { lang: 'js', workout: 'traversals' },
  { lang: 'pseudo', workout: 'variables' },
  { lang: 'pseudo', workout: 'conditionals' },
  { lang: 'pseudo', workout: 'procedures' },
  { lang: 'pseudo', workout: 'lists' },
  { lang: 'pseudo', workout: 'loops' },
  { lang: 'pseudo', workout: 'traversals' },
];

export default workouts;
