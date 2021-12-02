import { codeTags } from './codeTags';
import fillIt from './fillIt';

export default function tagAndWeightCode(code) {
   let complexity = 0;
   const tagsUsed = codeTags.filter((item, i) => {
      complexity += code.split(item.tag).length - 1;
      return code.indexOf(item.tag) > 0;
   });

   return {
      complexity: Math.round(complexity / 4),
      tagsUsed,
   };
}
