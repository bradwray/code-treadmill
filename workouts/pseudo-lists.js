/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `
      var nums = new PseudoArray([##,##,##])

       `,
      solveFor: 'nums.getElem(2)',
   },
   {
      content: `
      var nums = new PseudoArray([##,##,##])

       `,
      solveFor: 'nums.getElem(1)',
   },
   {
      content: `
      var nums = new PseudoArray([##,##,##])
      nums.setElem(1, ##)
       `,
      solveFor: 'nums.getElem(1)',
   },
   {
      content: `
      var names = new PseudoArray([^^,^^,^^,^^,^^,^^,^^,^^,^^,^^])

       `,
      solveFor: 'names.getElem(##)',
   },
   {
      content: `
      var names = new PseudoArray([^^,^^,^^,^^,^^,^^,^^,^^,^^,^^])
      var chosen = ##;
      names.setElem(chosen, ^^)
      name.setElem(##, ^^)
       `,
      solveFor: 'names.getElem(chosen)',
   },
   {
      content: `
      var names = new PseudoArray([^^,^^,^^,^^,^^,^^,^^])

       `,
      solveFor: 'names.LENGTH(names)',
   },
   {
      content: `
      var nums = new PseudoArray([##,##,##])
      nums.setElem(nums.LENGTH(nums), ##)
       `,
      solveFor: 'nums.getElem(3)',
   },
   {
      content: `
      var names = new PseudoArray([^^,^^,^^,^^,^^,^^,^^])
      names.REMOVE(names, names.LENGTH(names))
       `,
      solveFor: 'names.LENGTH(names)',
   },
   {
      content: `
      var animals = new PseudoArray([@@, @@, @@, @@])
      animals.REMOVE(animals, 1)
       `,
      solveFor: 'animals.getElem(1)',
   },
   {
      content: `
      var animals = new PseudoArray([@@, @@, @@, @@])
      animals.REMOVE(animals, 3)
       `,
      solveFor: 'animals.getElem(3)',
   },
   {
      content: `
      var animals = new PseudoArray([@@, @@, @@, @@])
      animals.APPEND(animals, @@)
       `,
      solveFor: 'animals.LENGTH(animals)',
   },
   {
      content: `
      var animals = new PseudoArray([@@])
      animals.APPEND(animals, @@)
      animals.APPEND(animals, @@)
       `,
      solveFor: 'animals.getElem(2)',
   },
   {
      content: `
      var animals = new PseudoArray([@@])
      animals.APPEND(animals, @@)
      animals.REMOVE(animals, 1)
      animals.APPEND(animals, @@)
       `,
      solveFor: 'animals.getElem(2)',
   },
   {
      content: `
      var chars = new PseudoArray([~~,~~,~~,~~,~~])
      chars.INSERT(chars, 1, ~~)
       `,
      solveFor: 'chars.getElem(2)',
   },
   {
      content: `
      var chars = new PseudoArray([~~,~~,~~,~~,~~])
      chars.INSERT(chars, chars.LENGTH(chars), ~~)
       `,
      solveFor: 'chars.getElem(6)',
   },
   {
      content: `
      var chars = new PseudoArray([~~,~~,~~,~~,~~])
      chars.INSERT(chars, 1, ~~)
      chars.APPEND(chars, ~~)
      chars.REMOVE(chars, 2)
       `,
      solveFor: 'chars.getElem(5)',
   },
   {
      content: `
      var chars = new PseudoArray([~~,~~,~~,~~,~~,~~,~~,~~,~~,~~,~~])
      chars.INSERT(chars, ##, ~~)
      chars.APPEND(chars, ~~)
      chars.REMOVE(chars, ##)
      chars.setElem(##, ~~)
       `,
      solveFor: 'chars.getElem(5)',
   },
   {
      content: `
      var nums = new PseudoArray([##,##,##,##,##,##,#-#,##,#-#])
      nums.INSERT(nums, ##, 2)
      var value = 0;
      if(nums.getElem(##) <= ##) {
         value = nums.getElem(##);
      }
       `,
      solveFor: 'value',
   },
   {
      content: `
      var nums = new PseudoArray([##,##,##,##,##,##,#-#,##,#-#])
      nums.INSERT(nums, ##, 2)
      var value = 0;
      if(nums.getElem(##) <= ##) {
         value = nums.getElem(1);
      }
      else {
         value = nums.getElem(9);
      }
       `,
      solveFor: 'value',
   },
   {
      content: `  
      var names = new PseudoArray([^^,^^,^^])
      
      names.APPEND(names, ^^)
      names.APPEND(names, ^^)
      names.APPEND(names, ^^)
      names.REMOVE(names, names.LENGTH(names))
      names.INSERT(names, 1, ^^)
      names.INSERT(names, 2, ^^)
      names.INSERT(names, 3, ^^)
  var name = names.getElem(1)
  names.setElem(4, ^^)
  names.setElem(5, ^^)
       `,
      solveFor: 'names.getElem(##)',
   },
];
