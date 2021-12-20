import { codeTags } from "./codeTags";

export default function tagAndWeightCode(workout) {
  console.log(workout);
  return workout.map(({ content, solveFor }, i) => {
    let complexity = 0;
    const tagsUsed = codeTags.filter(({ tag }) => {
      complexity += content.split(tag).length - 1;
      return content.indexOf(tag) > 0;
    });

    return {
      content,
      solveFor,
      complexity: Math.round(complexity / 4),
      tagsUsed,
      key: i,
    };
  });
}
