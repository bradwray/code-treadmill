/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `  var num = ##;`,
      solveFor: 'num',
   },
   {
      content: `  var count = ##;
   count = count + ##;`,
      solveFor: 'count',
   },
   {
      content: `  var x = #-#;
          x = x - ##;     `,
      solveFor: 'x',
   },
   {
      content: `  var a = ##;
          var b = ##
          b = a
          `,
      solveFor: 'b',
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
   {
      content: `  var radius = ##;
         var diameter = radius * 2
         `,
      solveFor: 'diameter',
   },
];
