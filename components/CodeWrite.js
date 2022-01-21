import React, { Component, Fragment, useContext } from 'react';

import CodeHighlight from './CodeHighlight.js';
import { Context } from './AppContext';
import Editor from 'react-simple-code-editor';

export default function CodeWriter({ handleSetCode, handleFocus, code }) {
   const [store, setStore] = useContext(Context);

   return (
      <Editor
         value={code}
         highlight={() => CodeHighlight(code, store.theme)}
         onValueChange={handleSetCode}
         onFocus={handleFocus}
         padding={10}
         autoFocus
         style={{
            fontSize: 18,
            width: '100%',
            minHeight: '150px',
            maxWidth: '1200px',
            border: '1px solid #555',
            boxSizing: 'border-box',
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...store.theme.plain,
         }}
      />
   );
}
