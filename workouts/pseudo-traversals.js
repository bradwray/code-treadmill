/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `
      var nums = new PseudoArray([(##)])
      sum = 0
      nums.forEach(num => {
        sum = sum + num
      })
       `,
      solveFor: 'nums.getElem(2)',
   },
];
