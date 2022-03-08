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
      content: `  var x = ##;
         var y = ##;

           var z = x + y;

         `,
      solveFor: 'z',
   },
   {
      content: `  var a = #-#;
             var b = ##
             b = a
             `,
      solveFor: 'b',
   },
   {
      content: `  var perp = ^^;
             var victim = ^^
             victim = perp
             `,
      solveFor: 'victim',
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
             var c = a
             a = b
             b = c
             `,
      solveFor: 'c',
   },
   {
      content: `  var a = ##;
             var b = ##
             var c = a
             a = b
             b = c
             `,
      solveFor: 'a',
   },
   {
      content: `  var a = ##;
             var b = ##
             var c = a
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
   {
      content: `  var x = ##;
         var y = ##;
         var z = ##;
           var a = x + y;
           var b = a + z;
           var c = b - x;
            `,
      solveFor: 'c',
   },
   {
      content: `  var num = #-#;
           var num2 = num + ##;
           var num3 = num2 + ##;
           var num4 = num3 - num2;
           var num5 = num4 + 1;
            `,
      solveFor: 'num5',
   },
   {
      content: `  var cows = ##;
         var horses = ##;
         var chickens = ##;
           var pigs = ##;
           var total = cows + horses + chickens + pigs;
           var theWolvesAte = ##;
           total = total - theWolvesAte;
            `,
      solveFor: 'total',
   },
   {
      content: `
           var fuelCapacity = ##;  // in gallons
           var fuelConsumed = 1;
           var fuelRemaining = fuelCapacity - fuelConsumed;
           var milesPerGallon = ##; // in miles per gallon
           var range = fuelRemaining * milesPerGallon;
            `,
      solveFor: 'range',
   },
   {
      content: `
         var x = #-#;
           var y = ##;
           var z = x % y;
            `,
      solveFor: 'z',
   },
   {
      content: `
         var x = ## > ##;
            `,
      solveFor: 'x',
   },
   {
      content: `
         var x = true;
           var y = false;
           var z = x && y;
            `,
      solveFor: 'z',
   },
   {
      content: `
         var x = ##;
           var y = ##;
           var z = x < y;
            `,
      solveFor: 'z',
   },
   {
      content: `
         var x = ##;
           var y = ##;
           var z = x != y;
            `,
      solveFor: 'z',
   },
   {
      content: `
            var x = ##;
              var y = ##;
              var z = x >= y;
               `,
      solveFor: 'z',
   },
   {
      content: `
            var x = ##;
              var y = ##;
              var z = x <= y;
               `,
      solveFor: 'z',
   },
   {
      content: `
            var zombies = ##;
            var humans = ##;
            var uhOh = zombies > ## && humans < ##
               `,
      solveFor: 'uhOh',
   },
   {
      content: `
            var cookies = ##;
            var milk = ##;
            var yum = cookies >= ## && milk >= ##
               `,
      solveFor: 'yum',
   },
   {
      content: `
            var age = #-#;
               var canMakeCake = age >= #-#;
               var canEatCake = age >= ##;
               var both = canMakeCake && canEatCake;
               var either = canMakeCake || canEatCake;

               `,
      solveFor: 'either',
   },
   {
      content: `  
      var oneNum = #-#;
      var otherNum = ##;
        var sum = oneNum + otherNum;
        var isOdd = sum % 2 == 1;
         `,
      solveFor: 'isOdd',
   },
   {
      content: `  
      var oneNum = #-#;
      var otherNum = ##;
        var sum = oneNum + otherNum;
        var isEven = sum % 2 == 0;
         `,
      solveFor: 'isEven',
   },
];
