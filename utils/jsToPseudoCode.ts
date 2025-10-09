const jsToPseudoCode = (jsCode: string): string => {
  let pseudoCode = bracketIndent(jsCode);
  pseudoCode = convert(pseudoCode);
  pseudoCode = makePseudoArray(pseudoCode);
  pseudoCode = simpleConversions(pseudoCode);
  return pseudoCode;
};

export default jsToPseudoCode;

const simpleConversions = (code: string): string => {
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

const bracketIndent = (code: string): string => {
  return code
    .split('\n')
    .map((line) => {
      if (line.includes(') {')) {
        const codeStart = line.lastIndexOf('  ');
        const indentStart = codeStart === -1 ? 0 : codeStart + 2;
        const indent = line.substring(0, indentStart);

        return line.replace(/[)] {/g, `) \n${indent}{`);
      }

      if (line.includes('} else {')) {
        const codeStart = line.lastIndexOf('  }');
        const indentStart = codeStart === -1 ? 0 : codeStart + 2;
        const indent = line.substring(0, indentStart);

        return line
          .replace(/{/g, `\n${indent}{`)
          .replace(/else/g, `\n${indent}else`);
      }

      return line;
    })
    .join('\n');
};

const invertConditions = (conditions: string): string => {
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

const makePseudoArray = (code: string): string => {
  let newCodeString = code;

  while (
    newCodeString.indexOf('.getElem') >= 0 ||
    newCodeString.indexOf('.LENGTH') >= 0 ||
    newCodeString.indexOf('.setElem') >= 0 ||
    newCodeString.indexOf('.INSERT') >= 0 ||
    newCodeString.indexOf('.APPEND') >= 0 ||
    newCodeString.indexOf('.REMOVE') >= 0
  ) {
    if (newCodeString.indexOf('.getElem') >= 0) {
      const getStart = newCodeString.indexOf('.getElem(');
      const getOpeningParenthesis = newCodeString.indexOf('(', getStart);
      const getClosingParenthesis = newCodeString.indexOf(')', getOpeningParenthesis);
      const value = newCodeString.substring(getOpeningParenthesis + 1, getClosingParenthesis);
      newCodeString = newCodeString.replace(
        newCodeString.substring(getStart, getClosingParenthesis + 1),
        `[${makePseudoArray(value)}]`,
      );
    }

    if (newCodeString.indexOf('.setElem') >= 0) {
      const getStart = newCodeString.indexOf('.setElem(');
      const getEnd = newCodeString.indexOf(');', getStart) + 2;
      const setElemLine = newCodeString.substring(getStart, getEnd)
        .replace('.setElem(', '[')
        .replace(',', '] ←')
        .replace(');', '');

      newCodeString = `${newCodeString.substring(0, getStart)}${setElemLine}${newCodeString.substring(
        getEnd,
      )}`;
    }

    const listNameIndex = Math.max(
      newCodeString.indexOf('.LENGTH'),
      newCodeString.indexOf('.INSERT'),
      newCodeString.indexOf('.APPEND'),
      newCodeString.indexOf('.REMOVE'),
    );

    let listNameDot: string;
    if (newCodeString.includes('.LENGTH')) {
      const spot = newCodeString.indexOf('.LENGTH');
      listNameDot = `${newCodeString.substring(spot + 8, newCodeString.indexOf(')', spot))}.`;
    } else {
      listNameDot = `${newCodeString.substring(
        listNameIndex + 8,
        newCodeString.indexOf(',', listNameIndex),
      )}.`;
    }

    newCodeString = newCodeString.replace(listNameDot, '');
  }

  return newCodeString;
};

const convert = (code: string): string => {
  const replaced = code.replace(/ = /g, ' ← ');
  return replaced
    .split('\n')
    .map((line) => {
      if (line.includes('while')) {
        const whileStart = line.indexOf('while');
        let conditions = line.substring(whileStart + 5, line.length - 1);
        conditions = invertConditions(conditions);
        const indent = line.substring(0, whileStart);
        return `${indent}REPEAT UNTIL${conditions}`;
      }

      if (line.includes('for (')) {
        const forStart = line.indexOf('for (');
        const forLine = line.substring(forStart, line.indexOf(')', forStart));
        const indent = line.substring(0, forStart);

        const comparisonStart = forLine.indexOf('<') + 2;
        const comparisonEnd = forLine.indexOf(';', forLine.indexOf('<'));
        let count = forLine.substring(comparisonStart, comparisonEnd);
        count = simpleConversions(count);
        return `${indent}REPEAT ${count} TIMES `;
      }

      if (line.includes('forEach')) {
        const forEachStart = line.indexOf('forEach');
        const indent = line.substring(0, forEachStart - 1);
        const listNameDot = line.substring(0, forEachStart - 1).trim();
        const adjustedIndent = indent.replace(listNameDot, '');
        const forEachLine = line
          .replace('.', '')
          .replace('=>', `IN ${listNameDot}`)
          .replace('((', ' ')
          .replace(')', '')
          .replace('forEach', 'FOR EACH')
          .replace('{', `\n${adjustedIndent}{`);
        return `${adjustedIndent}${forEachLine.substring(forEachStart - 1)}`;
      }

      if (line.includes('})')) {
        const indent = line.substring(0, line.indexOf('})'));
        return `${indent}}`;
      }

      if (line.includes('return')) {
        return line.replace('return ', 'RETURN(').replace(';', ')');
      }

      if (line.includes('new PseudoArray(')) {
        return line.replace('new PseudoArray(', '').replace(');', '');
      }

      return line;
    })
    .join('\n');
};
