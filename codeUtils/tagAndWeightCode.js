import fillIt from "./fillIt";
import { codeTags } from "./codeTags";

export default function tagAndWeightCode(code) {
  let difficulty = 0;
  const tagsUsed = codeTags.filter((item, i) => {
    difficulty += code.split(item.tag).length - 1;

    return code.indexOf(item.tag) > 0;
  });

  return {
    difficulty,
    tagsUsed,
  };
}

function timingFunc(code, solveFor) {
  //this didn't work on the windows machine but did on mac... super weird... maybe revisit later
  // const t0 = performance.webkitNow();
  // var wholeEval = new Function(fillIt(code) + "\n" + "return " + solveFor);
  // for (let i = 0; i < 1000; i++) {
  //   var ans = wholeEval();
  // }
  // const t1 = performance.webkitNow();
  // let diff = t1 - t0;
  // return diff;
}
