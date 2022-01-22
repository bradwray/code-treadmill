import { codeTags } from './codeTags';
import evalCode from './evalCode';
import fillItAndPrettify from './fillItAndPrettify';

export default function tagAndWeightExercise(content, solveFor, maker) {
   let complexity = 0;
   const tagsUsed = codeTags.filter(({ tag }) => {
      complexity += content.split(tag).length - 1;
      return content.indexOf(tag) > 0;
   });
   //    let ans = evalCode(fillItAndPrettify(content, maker), solveFor);
   //    let answerType = Number.isInteger(parseInt(ans.substring(0, 1), 10)) ? 'number' : 'text';
   return {
      type: 'read',
      content,
      solveFor,
      complexity: Math.round(complexity / 2.5),
      tagsUsed,
      //   answerType,
      //   answerLength: ans.toString().length,
   };
}
