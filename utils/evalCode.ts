import PseudoArray from './PseudoArray';

const evalCode = (code: string, solveFor: string, pseudo = false): string => {
  let preparedCode = code;

  if (preparedCode.includes('for(') || preparedCode.includes('while(')) {
    const startIndex = preparedCode.includes('for(')
      ? preparedCode.indexOf('for(')
      : preparedCode.indexOf('while(');
    const insertHere = preparedCode.indexOf('{', startIndex) + 1;
    preparedCode =
      'var infiniteLoopCounter = 0;' +
      preparedCode.substring(0, insertHere) +
      'if(++infiniteLoopCounter > 10000){throw "No infinite loops please!";}  ' +
      preparedCode.substring(insertHere);
  }

  preparedCode = preparedCode.replace(/import/g, '').replace(/require/g, '');
  preparedCode = pseudo ? PseudoArray + preparedCode : preparedCode;

  try {
    const wholeEval = new Function(`${preparedCode}\nreturn ${solveFor}`);
    const result = wholeEval();
    return result !== undefined && result !== null ? result.toString() : '';
  } catch (error) {
    return String(error);
  }
};

export default evalCode;
