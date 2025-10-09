import {
  randomAdj,
  randomAnimals,
  randomChar,
  randomName,
  randomSentence,
} from './randomStringGenerator';

import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier';

const fillItAndPrettify = (codeString: string, dontPrettify = false): string => {
  const filled = fillIt(codeString);

  if (dontPrettify) {
    return filled;
  }

  return prettier.format(filled, {
    semi: true,
    parser: 'babel',
    plugins: [parserBabel],
  });
};

export default fillItAndPrettify;

const fillIt = (codeString: string): string => {
  let newCodeString = codeString;

  while (
    newCodeString.indexOf('##') >= 0 ||
    newCodeString.indexOf('#-#') >= 0 ||
    newCodeString.indexOf('#.#') >= 0 ||
    newCodeString.indexOf('@@') >= 0 ||
    newCodeString.indexOf('^^') >= 0 ||
    newCodeString.indexOf('**') >= 0 ||
    newCodeString.indexOf('$$') >= 0 ||
    newCodeString.indexOf('~~') >= 0 ||
    newCodeString.indexOf('[(') >= 0 ||
    newCodeString.indexOf('!!') >= 0
  ) {
    newCodeString = newCodeString.replace('[(##)]', randomArray('##'));
    newCodeString = newCodeString.replace('[(#.#)]', randomArray('#.#'));
    newCodeString = newCodeString.replace('[(#-#)]', randomArray('#-#'));
    newCodeString = newCodeString.replace('[(@@)]', randomArray('@@'));
    newCodeString = newCodeString.replace('[(~~)]', randomArray('~~'));
    newCodeString = newCodeString.replace('[(^^)]', randomArray('^^'));
    newCodeString = newCodeString.replace('#-#', Math.floor(Math.random() * 9) + 8 + '');
    newCodeString = newCodeString.replace(
      '#.#',
      Number.parseFloat(String(Math.random())).toFixed(2),
    );
    newCodeString = newCodeString.replace('##', Math.ceil(Math.random() * 7) + '');
    newCodeString = newCodeString.replace('$$', `"${randomAdj()}"`);
    newCodeString = newCodeString.replace('^^', `"${randomName()}"`);
    newCodeString = newCodeString.replace('**', `${Math.random() > 0.5}`);
    newCodeString = newCodeString.replace('@@', `"${randomAnimals()}"`);
    newCodeString = newCodeString.replace('~~', `"${randomChar()}"`);
    newCodeString = newCodeString.replace('!!', `"${randomSentence()}"`);
  }

  return newCodeString;
};

const randomArray = (type: string): string => {
  let arrString = '';
  const num = Math.floor(Math.random() * 5) + 3;

  for (let i = 0; i < num; i++) {
    arrString += type + ',';
  }

  return `[${arrString}]`;
};
