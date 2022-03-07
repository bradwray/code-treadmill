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
      content: `
   function whatDoWeDo(thing){
      return thing.length;
   }
   function whoKnows(){
      var you = ^^
      var yourFriend = ^^
      return you + yourFriend
   }
   `,
      solveFor: 'whatDoWeDo(whoKnows())',
   },
   {
      content: `
   function timeToFeed(person, pet){
      return person + "\'s " + pet
   }
   `,
      solveFor: 'timeToFeed(^^, @@)',
   },
   {
      content: `
      var age = #-#
   function howOld(person){
      // this would be dumb to do...
      var age = ##
      // ...but...
      return person + " is " + age
   }
   `,
      solveFor: 'howOld(^^)',
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
         return --count;
      }
      return count;
   }

   `,
      solveFor: 'whatsItDo(^^)',
   },
   {
      content: `

      var count = #-#;

   function andThisOneToo(name){
      if(name.length >= 5){
         return --count;
      }
      return count;
   }
   // This'd be for using answer later, multiple times
   var answer = andThisOneToo($$)

   `,
      solveFor: 'answer',
   },
   {
      content: `
      
      var total = #-#;

   function andThis(thing1, thing2){
      if(thing1.length >= 5){
         return thing2.length;
      }
      return thing1.length;
   }

   function whatsThis(amt){
      return "$" + amt + "k"
   }

   var answer = whatsThis(andThis(@@, @@))

   `,
      solveFor: 'answer',
   },
];
