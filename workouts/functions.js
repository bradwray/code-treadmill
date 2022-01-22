/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `  

       function doThisThing(num){
          return num * num
       }
       
       
       `,
      solveFor: 'doThisThing(##)',
   },
   {
      content: `  var num = ##;

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
      content: `  var num1 = ##;
          var num2 = ##
          num1 = num2
          `,
      solveFor: 'num1',
   },
   {
      content: `  var i = ##;
          var j = ##
          i = i + j
          `,
      solveFor: 'i',
   },
   {
      content: `  var x = ##;
          var y = ##
          x += y
          `,
      solveFor: 'x',
   },
   {
      content: `  var a = ##;
          var b = ##
          var c;
 
          c = a
          a = b
          b = c
          `,
      solveFor: 'c',
   },
   {
      content: `  var a = ##;
          var b = ##
          var c;
 
          c = a
          a = b
          b = c
          `,
      solveFor: 'a',
   },
   {
      content: `  var a = ##;
          var b = ##
          var c;
          
          c = a
          a = b
          b = c
          `,
      solveFor: 'b',
   },
];
