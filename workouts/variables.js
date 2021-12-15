import tagAndWeightCode from '../utils/tagAndWeightCode';

export var slides = [
   {
      content: `  var num = ##;`,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
num = num + ##;`,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
            `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
            `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
            `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
            `,
      solveFor: 'num',
   },
].map((item, i) => {
   const { complexity, tagsUsed } = tagAndWeightCode(item.content);
   return {
      ...item,
      content: item.content,
      complexity,
      tagsUsed,
      key: i,
   };
});
