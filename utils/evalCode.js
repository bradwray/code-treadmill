const evalCode = (code, solveFor) => {
  if (code.includes("for(") || code.includes("while(")) {
    var startIndex = code.includes("for(")
      ? code.indexOf("for(")
      : code.indexOf("while(");
    var insertHere = code.indexOf("{", startIndex) + 1;
    code =
      "var counter = 0;" +
      code.substring(0, insertHere) +
      'if(++counter > 10000){throw "No infinite loops please!";}  ' +
      code.substring(insertHere, code.length);
  }
  // console.log(code);
  try {
    var wholeEval = new Function(code + "\n" + "return " + solveFor);
    return wholeEval().toString();
  } catch (error) {
    console.log(error.toString());
    return error.toString();
  }
};

export default evalCode;
