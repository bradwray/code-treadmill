import {
   randomAdj,
   randomAnimals,
   randomChar,
   randomName,
   randomSentence,
} from './randomStringGenerator.js';

import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier';

const fillItAndPrettify = (codeString, dontPrettify) => {
   var newCodeString = codeString;
   while (
      newCodeString.indexOf('##') >= 0 ||
      newCodeString.indexOf('#-#') >= 0 ||
      newCodeString.indexOf('#.#') >= 0 ||
      newCodeString.indexOf('@@') >= 0 ||
      newCodeString.indexOf('^^') >= 0 ||
      newCodeString.indexOf('**') >= 0 ||
      newCodeString.indexOf('$$') >= 0 ||
      newCodeString.indexOf('~~') >= 0 ||
      newCodeString.indexOf('!!') >= 0
   ) {
      newCodeString = newCodeString.replace('#-#', Math.floor(Math.random() * 9) + 8);
      newCodeString = newCodeString.replace('#.#', Math.random().toFixed(2));
      newCodeString = newCodeString.replace('##', Math.ceil(Math.random() * 7));
      newCodeString = newCodeString.replace('$$', `"${randomAdj()}"`);
      newCodeString = newCodeString.replace('^^', `"${randomName()}"`);
      newCodeString = newCodeString.replace('**', `${Math.random() > 0.5 ? true : false}`);
      newCodeString = newCodeString.replace('@@', `"${randomAnimals()}"`);
      newCodeString = newCodeString.replace('~~', `"${randomChar()}"`);
      newCodeString = newCodeString.replace('!!', `"${randomSentence()}"`);
   }

   if (dontPrettify) {
      return newCodeString;
   } else {
      return prettier.format(newCodeString, {
         semi: true,
         parser: 'babel',
         plugins: [parserBabel],
      });
   }
};

export default fillItAndPrettify;
