import tagAndWeightExercise from './tagAndWeightExercise';

import type { WorkoutExercise, WorkoutSlide, WorkoutSlideRead } from '../types';

export default function tagAndWeightCode(workout: WorkoutExercise[]): WorkoutSlide[] {
  const slides = workout.map((exercise, index) => ({
    ...tagAndWeightExercise(exercise.content, exercise.solveFor),
    key: index,
  })) as WorkoutSlideRead[];

  return [...slides, { type: 'end' as const }];
}
