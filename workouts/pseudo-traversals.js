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
      solveFor: 'sum',
   },
   {
      content: `
            var nums = new PseudoArray([(##)])
            sum = 0
            nums.forEach(num => {
              sum = sum + num
            })
             `,
      solveFor: 'sum',
   },
   {
      content: `
            var nums = new PseudoArray([(##)])
            sum = 0
            nums.forEach(num => {
                if(num > 4){
              sum = sum + num
                }
            })
             `,
      solveFor: 'sum',
   },
   {
      content: `
            var nums = new PseudoArray([(##)])
            sum = 0
            nums.forEach(num => {
                if(num < 4){
                  sum = sum + 1
                }
                else{
                  sum = sum - 1
                }
            })
             `,
      solveFor: 'sum',
   },
   {
      content: `
            var nums = new PseudoArray([(#.#)])
            sum = 0
            nums.forEach(num => {
                if(num < 0.5){
                  sum = sum + 1
                }
                else{
                  sum = sum - 1
                }
            })
             `,
      solveFor: 'sum',
   },
   {
      content: `
                  var nums = new PseudoArray([(#-#)])
                  var resultList = new PseudoArray([])
                  nums.forEach(num => {
                      if(num % 2 == 0){
                        resultList.APPEND(resultList, num)
                      }
                  })
                   `,
      solveFor: 'resultList.LENGTH(resultList)',
   },
   {
      content: `
                  var nums = new PseudoArray([(#-#)])
                  var resultList = new PseudoArray([])
                  nums.forEach(num => {
                     resultList.INSERT(resultList, 1, num)
                  })
                   `,
      solveFor: 'resultList.getElem(1)',
   },
   {
      content: `
                     var nums = new PseudoArray([(#-#)])
                     var resultList = new PseudoArray([])
                     nums.forEach(num => {
                        resultList.INSERT(resultList, 1, num)
                     })
                    var len = resultList.LENGTH(resultList)
                      `,
      solveFor: 'resultList.getElem(len)',
   },
   {
      content: `
                     var nums = new PseudoArray([(#-#)])
                     var resultList = new PseudoArray([])
                     nums.forEach(num => {
                        resultList.APPEND(resultList, num)
                     })
                      `,
      solveFor: 'resultList.getElem(1)',
   },
   {
      content: `
                     var nums = new PseudoArray([(#-#)])
                     var resultList = new PseudoArray([])
                     nums.forEach(num => {
                        resultList.APPEND(resultList, num)
                     })

                     var len = resultList.LENGTH(resultList)
                      `,
      solveFor: 'resultList.getElem(len)',
   },
   {
      content: `
                  var nums = new PseudoArray([(#-#)])
                  var resultList = new PseudoArray([])
                  nums.forEach(num => {
                      if(num % 2 == 0){
                     resultList.APPEND(resultList, num)
                      }
                      else{
                          resultList.INSERT(resultList, 1, num)
                      }
                  })
                   `,
      solveFor: 'resultList.getElem(1)',
   },
   {
      content: `
                  var nums = new PseudoArray([(#-#)])
                  var resultList = new PseudoArray([])
                  nums.forEach(num => {
                      if(num % 2 == 0){
                     resultList.APPEND(resultList, num)
                      }
                      else{
                          resultList.INSERT(resultList, 1, num)
                      }
                  })
                  var len = resultList.LENGTH(resultList)
                   `,
      solveFor: 'resultList.getElem(len)',
   },
   {
      content: `
                  function countOdds(arr) {
                      var sum = 0;
                      arr.forEach(num => {
                          if(num % 2 == 1){
                              sum = sum + 1
                          }
                      })
                      return sum;
                  }

                  var list = new PseudoArray([(#-#)])
                   `,
      solveFor: 'countOdds(list)',
   },
   {
      content: `
         //hold up... what?
               function countOdds(arr) {
                   var sum = 0;
                   arr.forEach(num => {
                       if(num % 3 == 0){
                           sum = sum + 1
                       }
                   })
                   return sum;
               }

               var list = new PseudoArray([(#-#)])
                `,
      solveFor: 'countOdds(list)',
   },
];
