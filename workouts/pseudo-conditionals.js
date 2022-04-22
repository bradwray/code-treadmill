/* eslint-disable import/no-anonymous-default-export */

export default [
   //  {
   //     content: `  var widgets = ##;
   //   var gadgets = ##;

   //   if(widgets > gadgets){
   //     widgets = widgets - gadgets;
   //   }`,
   //     solveFor: 'widgets',
   //  },
   //  {
   //     content: `  var price = 5
   //  var howMany = ##;
   //  var total = 0;
   //  if(price >= ##){
   //    total = price * howMany;
   //  }`,
   //     solveFor: 'total',
   //  },
   //  {
   //     content: `   var age = #-# + ## + ##;
   //     var canVote;

   //     if(age >= 18){
   //       canVote = true;
   //     }
   //     else{
   //       canVote = false;
   //     }`,
   //     solveFor: 'canVote',
   //  },
   //  {
   //     content: `   var name = ^^;

   //      if(name.length <= ##){
   //        shortName = false;
   //      }
   //      else{
   //        shortName = true;
   //      }`,
   //     solveFor: 'shortName',
   //  },
   //  {
   //     content: `    var inchesOfSnow = ##;
   //    var schoolStatus

   //    if(inchesOfSnow >= 5){
   //      schoolStatus = "Cancel";
   //    }
   //    else if(inchesOfSnow >= 1){
   //      schoolStatus = "Delay";
   //    }
   //    else{
   //      schoolStatus = "Open";
   //    }`,
   //     solveFor: 'schoolStatus',
   //  },
   //  {
   //     content: `    var inchesOfSnow = ##;
   //     var schoolStatus;

   //     if(inchesOfSnow < 1){
   //       schoolStatus = "Open";
   //     }
   //     else if(inchesOfSnow < 5){
   //       schoolStatus = "Delay";
   //     }
   //     else{
   //       schoolStatus = "Cancel";
   //     }`,
   //     solveFor: 'schoolStatus',
   //  },
   //  {
   //     content: `    var inchesOfSnow = ##;
   //    var iceAmount = #.# //fraction of inch ice
   //    var schoolStatus;

   //    if(inchesOfSnow >= 5){
   //      schoolStatus = "Snow - Cancel";
   //    }
   //    else if(inchesOfSnow >= 1){
   //      if(iceAmount > 0.4){
   //        schoolStatus = "Ice - Cancel";
   //      }
   //      else{
   //        schoolStatus = "Delay";
   //      }
   //    }
   //    else{
   //      schoolStatus = "Open";
   //    }`,
   //     solveFor: 'schoolStatus',
   //  },
   {
      content: `    var inchesOfSnow = ##;
     var iceAmount = #.# //fraction of inch ice
     var schoolStatus;
 
     if(inchesOfSnow >= 5){
       schoolStatus = "Snow - Cancel";
     }
     else if(inchesOfSnow >= 1){
       if(iceAmount > 0.5){
         schoolStatus = "Ice - Cancel";
       }
       else{
         schoolStatus = "Snow - Delay";
       }
     }
     else{
       if(iceAmount > 0.25){
         schoolStatus = "Ice - Delay";
       }
       else{
         schoolStatus = "Open";
       }
     }`,
      solveFor: 'schoolStatus',
   },
   {
      content: `    var inchesOfSnow = ##;
     var iceAmount = #.# //fraction of inch ice
     var schoolStatus;
 
     if(inchesOfSnow >= 5){
       schoolStatus = "Snow - Cancel";
     }
     else if(inchesOfSnow >= 1 && iceAmount > 0.5){
         schoolStatus = "Ice & Snow - Cancel";
     }
     else if (inchesOfSnow >= 1 || iceAmount > 0.25){
         schoolStatus = "Delay";
     }
     else{
       schoolStatus = "Open";
     }`,
      solveFor: 'schoolStatus',
   },
   {
      content: `    var x = ## + 3;
 
     if(x > 5){
       x = 10;
     }`,
      solveFor: 'x',
   },
   {
      content: `    var x = ## + 3;
 
     if(x > 5){
       x = 10;
     }
 
     if(x <= 5){
       x = 0;
     }`,
      solveFor: 'x',
   },
   {
      content: `    var age = ## + 7;
     var canHuntDeer = age > 12;
     var answer = "No";
 
     if(canHuntDeer){
       answer = "Yes";
     }`,
      solveFor: 'answer',
   },
   {
      content: `    var age = ## + 7;
     var canRideBike = **;
     var bigKid = age > 10 && canRideBike;
     var answer = "No";
  
     `,
      solveFor: 'answer',
   },
   {
      content: `  
     
     
     var yay = "All done. Nice work!"`,
      solveFor: 'yay',
   },
];
