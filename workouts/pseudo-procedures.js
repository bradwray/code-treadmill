/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `
       function doThisThing(num){
          return num + num
       }
       `,
      solveFor: 'doThisThing(##)',
   },
   {
      content: `
      var num = ##
       function doThisThing(){
          return num + num
       }
       `,
      solveFor: 'doThisThing()',
   },
   {
      content: `
      var count = ##;
       function doThisThing(num){
          return num + num
       }
       `,
      solveFor: 'doThisThing(##)',
   },
   {
      content: `
      var num = ##;

       function doThisThing(num){
          // i'm bored
          return num + num
       }
       `,
      solveFor: 'num',
   },
   {
      content: `
      var num = #-#;

       function doThisThing(num){
          // fire the person who named this parameter num
          return num;
       }
       `,
      solveFor: 'doThisThing(##)',
   },
   {
      content: `
      var num = ##;
       function doThisThing(){
          //not sure why you'd ever do this... but...
          var num = ##;
       }
       `,
      solveFor: 'num',
   },
   {
      content: `
      var num = #-#;
       function doThisThing(num){
          // which num is it?
          num = num + num
          return num;
       }
       `,
      solveFor: 'doThisThing(##)',
   },
   {
      content: `
      var num = ##;
       function doThisThing(){
          // you'd probably never do this but...
          var num = #-#;
          // which num is it?
          return num
       }
       `,
      solveFor: 'doThisThing()',
   },
   {
      content: `
      var num = #-#;
       function doThisThing(){
          var num = ##;
          return num * num
       }
       `,
      solveFor: 'doThisThing()',
   },
   {
      content: `  var num = ##;
   function doThisThing(){
      num += ##
   }
   doThisThing()
   `,
      solveFor: 'num',
   },
   {
      content: `  var num = #-#;
    function doThisThing(){
       num += ##
    }
    `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
   function doThisThing(){
      num += ##
   }
   doThisThing()
   doThisThing()
   `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
   function doSomething(){
      num += ##
   }
   function doSomethingElse(){
      num -= ##
   }
   doSomething()
   doSomethingElse()
   doSomething()
   `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
   function addTen(){
      num += 10
      subtractFive()
   }
   function subtractFive(){
      num -= 5
   }
   addTen()
   `,
      solveFor: 'num',
   },
   {
      content: `  var num = ##;
   function addTen(){
      num += 10
      subtractFive()
   }
   function subtractFive(){
      num -= 5
   }
   subtractFive()
   `,
      solveFor: 'num',
   },
   {
      content: `
   function mystery(thing){
      return thing.length;
   }
   `,
      solveFor: 'mystery(@@)',
   },
   {
      content: `  var num = #-#;
   function doThisThing(){
      return num - ##;
   }
   num = doThisThing()
   `,
      solveFor: 'num',
   },
   {
      content: `
   function doThisThing(num){
      return num - ##;
   }
   num = doThisThing(#-#)
   `,
      solveFor: 'num',
   },
   {
      content: `// multiple returns is pretty normal

      var count = #-#;

   function whatsItDo(name){
      if(name.length >= 5){
         return count + ##;
      }
      return count;
   }

   `,
      solveFor: 'whatsItDo(^^)',
   },
];
