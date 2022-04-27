const jsToPseudoCode = (jsCode) => {
   let pseudoCode = bracketIndent(jsCode);
   pseudoCode = convert(pseudoCode);

   pseudoCode = makePseudoArray(pseudoCode);
   pseudoCode = simpleConversions(pseudoCode);
   return pseudoCode;
};

export default jsToPseudoCode;

const simpleConversions = (code) => {
   return code
      .replace(/var /g, '')
      .replace(/ != /g, ' ≠ ')
      .replace(/ >= /g, ' ≥ ')
      .replace(/ <= /g, ' ≤ ')
      .replace(/ === /g, ' = ')
      .replace(/ == /g, ' = ')
      .replace(/ % /g, ' MOD ')
      .replace(/ !/g, ' NOT')
      .replace(/ &&/g, ' AND')
      .replace(/ [|][|]/g, ' OR')
      .replace(/;/g, '')
      .replace(/else if/g, '\nELSE IF')
      .replace(/if /g, 'IF ')
      .replace(/else /g, 'ELSE')
      .replace(/function/g, 'PROCEDURE');
};

const bracketIndent = (code) => {
   return code
      .split('\n')
      .map((line, i) => {
         if (line.includes(') {')) {
            let codeStart = line.lastIndexOf('  ');
            codeStart = codeStart === -1 ? 0 : codeStart + 2;
            let indent = line.substring(0, codeStart);

            line = line.replace(/[)] {/g, ') \n' + indent + '{');
            return line;
         }
         if (line.includes('} else {')) {
            let codeStart = line.lastIndexOf('  }');
            codeStart = codeStart === -1 ? 0 : codeStart + 2;
            let indent = line.substring(0, codeStart);

            line = line.replace(/{/g, '\n' + indent + '{');
            line = line.replace(/else/g, '\n' + indent + 'else');
            return line;
         } else {
            return line;
         }
      })
      .join('\n');
};

const invertConditions = (conditions) => {
   //uses De Morgan's Law to invert the conditions
   return conditions
      .replace(/ == /g, ' ≠ ')
      .replace(/ === /g, ' ≠ ')
      .replace(/ < /g, ' ≥ ')
      .replace(/ > /g, ' ≤ ')
      .replace(/ >= /g, ' < ')
      .replace(/ <= /g, ' > ')
      .replace(/ != /g, ' = ')
      .replace(/ !== /g, ' = ')
      .replace(/ % /g, ' MOD ')
      .replace(/ !/g, '')
      .replace(/ &&/g, ' OR')
      .replace(/ [|][|]/g, ' AND');
};

const makePseudoArray = (code) => {
   let newCodeString = code;
   // console.log('making psedudo array');
   while (
      newCodeString.indexOf('.getElem') >= 0 ||
      newCodeString.indexOf('.LENGTH') >= 0 ||
      newCodeString.indexOf('.setElem') >= 0 ||
      newCodeString.indexOf('.INSERT') >= 0 ||
      newCodeString.indexOf('.APPEND') >= 0 ||
      newCodeString.indexOf('.REMOVE') >= 0
   ) {
      if (newCodeString.indexOf('.getElem') >= 0) {
         let getStart = newCodeString.indexOf('.getElem(');
         let getOpeningParenthesis = newCodeString.indexOf('(', getStart);
         let getClosingParenthesis = newCodeString.indexOf(')', getOpeningParenthesis);
         let val = newCodeString.substring(getOpeningParenthesis + 1, getClosingParenthesis);
         newCodeString = newCodeString.replace(
            newCodeString.substring(getStart, getClosingParenthesis + 1),
            '[' + makePseudoArray(val) + ']'
         );
      }
      if (newCodeString.indexOf('.setElem') >= 0) {
         let getStart = newCodeString.indexOf('.setElem(');
         let getEnd = newCodeString.indexOf(');', getStart) + 2;
         let setElemLine = newCodeString.substring(getStart, getEnd);
         console.log(setElemLine);
         setElemLine = setElemLine.replace('.setElem(', '[');
         setElemLine = setElemLine.replace(',', '] ←');
         setElemLine = setElemLine.replace(');', '');

         newCodeString =
            newCodeString.substring(0, getStart) + setElemLine + newCodeString.substring(getEnd);
      }

      let listNameIndex = Math.max(
         newCodeString.indexOf('.LENGTH'),
         newCodeString.indexOf('.INSERT'),
         newCodeString.indexOf('.APPEND'),
         newCodeString.indexOf('.REMOVE')
      );

      let listNameDot;
      if (newCodeString.includes('.LENGTH')) {
         // grabs the list name and puts it inside LENGTH as a parameter
         let spot = newCodeString.indexOf('.LENGTH');
         listNameDot = newCodeString.substring(spot + 8, newCodeString.indexOf(')', spot)) + '.';
      } else {
         // grabs the list name from the INSERT, APPEND, REMOVE by grabbing the first parameter
         listNameDot =
            newCodeString.substring(listNameIndex + 8, newCodeString.indexOf(',', listNameIndex)) +
            '.';
      }
      newCodeString = newCodeString.replace(listNameDot, '');
   }
   return newCodeString;
};

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {}
}

const convert = (code) => {
   //switches the assignment operator so the inverted conditions work
   let newCode = code.replace(/ = /g, ' ← ');
   return newCode
      .split('\n')
      .map((line) => {
         if (line.includes('while')) {
            let whileStart = line.indexOf('while');
            let conditions = line.substring(whileStart + 5, line.length - 1);
            conditions = invertConditions(conditions)
            let indent = line.substring(0, whileStart);
            return indent + 'REPEAT UNTIL' + conditions;
         } else if (line.includes('for')) {
            let forStart = line.indexOf('for');
            let forLine = line.substring(forStart, line.indexOf(')', forStart));
            let indent = line.substring(0, forStart);

            let count = forLine.substring(
               forLine.indexOf('<') + 2,
               forLine.indexOf(';', forLine.indexOf('<'))
            );
            count = simpleConversions(count);
            return indent + 'REPEAT ' + count + ' TIMES ';
         } else if (line.includes('return')) {
            return line.replace('return ', 'RETURN(').replace(';', ')');
         } else if (line.includes('new PseudoArray(')) {
            return line.replace('new PseudoArray(', '').replace(');', '');
         } else {
            return line;
         }
      })
      .join('\n');
};
