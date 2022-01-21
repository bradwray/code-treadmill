const evalCode = (code, solveFor) => {
   var wholeEval = new Function(code + '\n' + 'return ' + solveFor);

   try {
      return wholeEval().toString();
   } catch (error) {
      console.log(error.toString());
      return error.toString();
   }
};

export default evalCode;
