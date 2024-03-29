import PseudoArray from './PseudoArray';

const evalCode = (code, solveFor, pseudo) => {
   //infinite loop protector
   if (code.includes('for(') || code.includes('while(')) {
      var startIndex = code.includes('for(') ? code.indexOf('for(') : code.indexOf('while(');
      var insertHere = code.indexOf('{', startIndex) + 1;
      code =
         'var infiniteLoopCounter = 0;' +
         code.substring(0, insertHere) +
         'if(++infiniteLoopCounter > 10000){throw "No infinite loops please!";}  ' +
         code.substring(insertHere, code.length);
   }
   // seems like a good idea to disallow some things
   code = code.replace(/import/g, '').replace(/require/g, '');
   // add the PseudoArray class for realistic AP CSP PseudoCode arrays
   code = pseudo ? PseudoArray + code : code;
   try {
      var wholeEval = new Function(code + '\n' + 'return ' + solveFor);
      return wholeEval().toString();
   } catch (error) {
      return error.toString();
   }
};

export default evalCode;
