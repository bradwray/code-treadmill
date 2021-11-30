import fillIt from "./fillIt";
import { codeTags } from "./codeTags";

export default function tagAndWeightCode(code) {
  let complexity = 0;
  const tagsUsed = codeTags.filter((item, i) => {
    complexity += code.split(item.tag).length - 1;
    return code.indexOf(item.tag) > 0;
  });

  return {
    complexity: Math.ceil(complexity / 4),
    tagsUsed,
  };
}
