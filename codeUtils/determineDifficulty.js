import fillIt from './fillIt';

export default function determineDifficulty(code, solveFor) {
   const t0 = performance.now();

   var wholeEval = new Function(fillIt(code) + '\n' + 'return ' + solveFor);

   for (let i = 0; i < 1000; i++) {
      var ans = wholeEval();
   }

   const t1 = performance.now();

   let diff = t1 - t0;

   return diff;
}
