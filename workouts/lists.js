/* eslint-disable import/no-anonymous-default-export */
export default [
   {
      content: `
         var names = [^^, ^^, ^^]

         `,
      solveFor: 'names.length',
   },
   {
      content: `
   // zero is actually the first number

         var ages = [##, ##, ##]

         `,
      solveFor: 'ages[0]',
   },
   {
      content: `

            var letters = [~~, ~~, ~~]

            `,
      solveFor: 'letters[1]',
   },
   {
      content: `
         var weights = [#-#, #-#, #-#, #-#, #-#, #-#, #-#, #-#, #-#]

         `,
      solveFor: 'weights[##]',
   },
   {
      content: `
         var names = [^^, ^^, ^^]

         `,
      solveFor: 'names[0].length',
   },
   {
      content: `
            var votes = [#-#, #-#, #-#, #-#, #-#, #-#, #-#, #-#, #-#]

            var result = votes[0] + votes[1]

            `,
      solveFor: 'result',
   },
   {
      content: `
               var names = [^^, ^^, ^^]

               `,
      solveFor: 'names[names.length - 1]',
   },
   {
      content: `
   // sometimes .length means different things

            var names = [^^, ^^, ^^]

            `,
      solveFor: 'names[names.length - 1].length',
   },
   {
      content: `
            var wildBeasts = [@@, @@, @@]
            var gentlePets = [@@, @@, @@]

            var temp = wildBeasts[1]
            wildBeasts[1] = gentlePets[2]
            gentlePets[2] = temp

            `,
      solveFor: 'wildBeasts[1]',
   },
   {
      content: `

               var descriptions = [$$, $$, $$]
               descriptions[descriptions.length] = $$

               `,
      solveFor: 'descriptions[3]',
   },
   {
      content: `

               var descriptions = [$$, $$, $$]
               descriptions.push($$)

               `,
      solveFor: 'descriptions[3]',
   },
   {
      content: `

               var descriptions = [$$, $$, $$, $$]
               descriptions.push($$)

               `,
      solveFor: 'descriptions.length',
   },
   {
      content: `
            var scores = [#-#, #-#, #-#, #-#, #-#, #-#, #-#, #-#]
            var result = Math.max(...scores)

            `,
      solveFor: 'result',
   },
   {
      content: `
               var scores = [#-#, #-#, #-#, #-#, #-#, #-#, #-#]
               var result = Math.min(...scores)

               `,
      solveFor: 'result',
   },
   {
      content: `
                  var veterinaryWaitingRoom = [@@, @@, @@, @@, @@, @@]
                  veterinaryWaitingRoom.pop()

                  `,
      solveFor: 'veterinaryWaitingRoom.length',
   },
   {
      content: `
                  var stillWaiting = [@@, @@, @@, @@, @@, @@, @@]
                  stillWaiting.pop()

                  `,
      solveFor: 'stillWaiting[stillWaiting.length-1]',
   },
   {
      content: `
               var naughtyList = [^^, ^^, ^^, ^^]
               var hottyList = [^^, ^^, ^^]
               var naughtyHottyList = naughtyList.concat(hottyList)

               `,
      solveFor: 'naughtyHottyList[naughtyHottyList.length-1]',
   },
   {
      content: `
               var deadly = [@@, @@, @@, @@ ]
               var cuddly = [@@, @@, @@, @@, @@, @@]
               deadly.pop()

               cuddly = cuddly.concat(deadly)

               `,
      solveFor: 'cuddly[##]',
   },
   {
      content: `
               var deadly = [@@, @@, @@, @@ ]
               var cuddly = [@@, @@, @@, @@, @@, @@]
               deadly.pop()

               cuddly = deadly.concat(cuddly)

               `,
      solveFor: 'cuddly[##]',
   },
   {
      content: `

            var letters = [~~, ~~, ~~]
            var andNow = letters.join("")
            `,
      solveFor: 'andNow',
   },
   {
      content: `

            var letters = [~~, ~~, ~~]
            var butHere = letters.join("-")
            `,
      solveFor: 'butHere',
   },
   {
      content: `

            var letters = [~~, ~~, ~~]
            var maybeAlso = letters.join(~~)
            `,
      solveFor: 'maybeAlso',
   },
   {
      content: `

            var letters = [~~, ~~, ~~]
            var butUsually = letters.join()
            `,
      solveFor: 'butUsually',
   },
   {
      content: `

            var name = "Genevieve"
            var splitUp = name.split('e')
            `,
      solveFor: 'splitUp[0]',
   },
   {
      content: `

            var name = "Genevieve"
            var splitUp = name.split('v')
            `,
      solveFor: 'splitUp[0]',
   },
   {
      content: `

            var name = "Genevieve"
            var splitUp = name.split('ev')
            `,
      solveFor: 'splitUp[1]',
   },
   {
      content: `

            var someStuff = "First Name, Last Name, Age, Height, Weight, Eye Color, DOB, Address, Organ Donor"
            var likeThis = someStuff.split(', ')
            `,
      solveFor: 'likeThis[##]',
   },
   {
      content: `
        // and finally, some weird nonsense
        
         var passCode = "The " + $$ + @@ + " named " + ^^ + "!"
         var parts = passCode.split('e')
         `,
      solveFor: 'parts.length',
   },
];
