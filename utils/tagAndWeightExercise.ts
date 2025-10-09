import { codeTags } from './codeTags';
import evalCode from './evalCode';
import fillItAndPrettify from './fillItAndPrettify';

import type { CodeTag, WorkoutSlideRead } from '../types';

export default function tagAndWeightExercise(
  content: string,
  solveFor: string,
  maker?: boolean,
): WorkoutSlideRead {
  let complexity = 0;

  const tagsUsed: CodeTag[] = codeTags.filter(({ tag }) => (content + solveFor).indexOf(tag) > 0);

  tagsUsed.forEach(({ tag, weight }) => {
    complexity += (content.split(tag).length - 1) * weight;
  });

  const answer = evalCode(fillItAndPrettify(content, maker), solveFor);
  const answerType = Number.isInteger(parseInt(answer.substring(0, 1), 10)) ? 'number' : 'text';

  return {
    type: 'read',
    content,
    solveFor: fillItAndPrettify(solveFor, maker),
    complexity: Math.round(complexity / 1.5),
    tagsUsed,
    answerType,
    answerLength: answer.toString().length,
  };
}
