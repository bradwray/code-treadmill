/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `  
      var list = new PseudoArray([1,2,3])  
      var nums = new PseudoArray([##,##,##])  
      var names = new PseudoArray([^^,^^,^^]) 
      names.getElem(3)
      names.APPEND(names, "John")
      names.REMOVE(names, names.LENGTH(names))
      
  
       `,
      solveFor: 'names.getElem(names.LENGTH(names))',
   },
];
