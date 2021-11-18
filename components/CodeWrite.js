import React, { Component, Fragment, useContext } from 'react';

import CodeHighlight from './CodeHighlight.js';
import { Context } from './AppContext';
import Editor from 'react-simple-code-editor';
import theme from 'prism-react-renderer/themes/nightOwl';

export default function CodeWriter({ handleSetCode, handleFocus, code }) {
   return (
      <Editor
         value={code}
         highlight={CodeHighlight}
         onValueChange={handleSetCode}
         onFocus={handleFocus}
         padding={10}
         // autoFocus
         style={{
            fontSize: 18,
            width: '100%',
            minHeight: '150px',
            maxWidth: '1200px',
            border: '1px solid #555',
            boxSizing: 'border-box',
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...theme.plain,
         }}
      />
   );
}
