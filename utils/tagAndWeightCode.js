import { codeTags } from './codeTags';

export default function tagAndWeightCode(workout) {
   // console.log(workout);
   return workout
      .map(({ content, solveFor }, i) => {
         let complexity = 0;
         const tagsUsed = codeTags.filter(({ tag }) => {
            complexity += content.split(tag).length - 1;
            return content.indexOf(tag) > 0;
         });

         return {
            type: 'read',
            content,
            solveFor,
            complexity: Math.round(complexity / 2.5),
            tagsUsed,
            key: i,
         };
      })
      .concat({ type: 'end' });
}
