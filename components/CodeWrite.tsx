import React, { useContext } from 'react';
import Editor from 'react-simple-code-editor';

import CodeHighlight from './CodeHighlight';
import { Context } from './AppContext';

interface CodeWriterProps {
  code: string;
  handleSetCode: (value: string) => void;
  handleFocus?: () => void;
}

export default function CodeWriter({
  code,
  handleSetCode,
  handleFocus,
}: CodeWriterProps): React.ReactElement {
  const [store] = useContext(Context);

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
