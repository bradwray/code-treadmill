import { codeTags } from './codeTags';
import evalCode from './evalCode';
import fillItAndPrettify from './fillItAndPrettify';

export default function tagAndWeightCode(workout) {
   // console.log(workout);
   return workout
      .map(({ content, solveFor }, i) => {
         let complexity = 0;
         const tagsUsed = codeTags.filter(({ tag }) => {
            complexity += content.split(tag).length - 1;
            return content.indexOf(tag) > 0;
         });
         let ans = evalCode(fillItAndPrettify(content, solveFor), solveFor);
         let answerType = Number.isInteger(parseInt(ans.substring(0, 1), 10)) ? 'number' : 'text';
         return {
            type: 'read',
            content,
            solveFor,
            complexity: Math.round(complexity / 2.5),
            tagsUsed,
            key: i,
            answerType,
            answerLength: ans.toString().length,
         };
      })
      .concat({ type: 'end' });
}
