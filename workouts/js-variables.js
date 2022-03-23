/* eslint-disable import/no-anonymous-default-export */
export default [
  {
    content: `  var num = ##;`,
    solveFor: "num",
  },
  {
    content: `  var count = ##;
   count = count + ##;`,
    solveFor: "count",
  },
  {
    content: `  var x = #-#;
          x = x - ##;     `,
    solveFor: "x",
  },
  {
    content: `  var counter = ##;
         counter += ##;    `,
    solveFor: "counter",
  },
  {
    content: `  var counter = ##;
         counter++;    `,
    solveFor: "counter",
  },
  {
    content: `  var counter = ##;
    counter--;    `,
    solveFor: "counter",
  },
  {
    content: `  var i = ##;
         i -= ##;    ;
             `,
    solveFor: "i",
  },
  {
    content: `  var a = ##;
          var b = ##
          b = a
          `,
    solveFor: "b",
  },
  {
    content: `  var num1 = ##;
          var num2 = ##
          num1 = num2
          `,
    solveFor: "num1",
  },
  {
    content: `  var i = ##;
          var j = ##
          i = i + j
          `,
    solveFor: "i",
  },
  {
    content: `  var x = ##;
          var y = ##
          x += y
          `,
    solveFor: "x",
  },
  {
    content: `  var a = ##;
          var b = ##
          var c;
          c = a
          a = b
          b = c
          `,
    solveFor: "c",
  },
  {
    content: `  var a = ##;
          var b = ##
          var c;
          c = a
          a = b
          b = c
          `,
    solveFor: "a",
  },
  {
    content: `  var a = ##;
          var b = ##
          var c;
          c = a
          a = b
          b = c
          `,
    solveFor: "b",
  },
  {
    content: `  var radius = ##;
         var diameter = radius * 2
         `,
    solveFor: "diameter",
  },
  {
    content: `
       var r = #-#
       var s = r/2
       r = s
       r *= 2
         `,
    solveFor: "r",
  },
  {
    content: `
       var t;
       var u = ##
       var v = @@
       t = v + u
         `,
    solveFor: "t",
  },
  {
    content: `
        var t;
        var u = ##
        var v = @@
        t = v + u
          `,
    solveFor: "t",
  },
  {
    content: `
       var result = $$ + " " + @@
         `,
    solveFor: "result",
  },
  {
    content: `
       var adjective = $$
       var animal = @@
       var result = adjective + " " + animal
         `,
    solveFor: "result",
  },
  {
    content: `
      var adjective = $$
      var animal = @@
      var person = ^^
      var result = adjective + " " + person
        `,
    solveFor: "result",
  },
  {
    content: `
      var person = ^^
      var animal = @@
      var result = person + " has an " + animal
        `,
    solveFor: "result",
  },
];
