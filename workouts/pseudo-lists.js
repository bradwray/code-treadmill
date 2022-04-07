/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `  
      var list = new PseudoArray([1,2,3])
      var nums = new PseudoArray([##,##,##])
      var names = new PseudoArray([^^,^^,^^])
      
      names.APPEND(names, "John")
      names.REMOVE(names, names.LENGTH(names))
      names.INSERT(names, 1, "Jane")
  var name = names.getElem(1)
  names.setElem(1, 5)
       `,
      solveFor: 'names.getElem(1)',
   },
];
