import { codeTags } from './codeTags';
import evalCode from './evalCode';
import fillItAndPrettify from './fillItAndPrettify';
import tagAndWeightExercise from './tagAndWeightExercise';

export default function tagAndWeightCode(workout) {
   // console.log(workout);
   return workout
      .map(({ content, solveFor }, i) => {
         return {
            ...tagAndWeightExercise(content, solveFor),
            key: i,
         };
      })
      .concat({ type: 'end' });
}
