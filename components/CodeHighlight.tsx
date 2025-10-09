import Highlight, { defaultProps } from 'prism-react-renderer';
import React from 'react';

import type { PrismTheme } from 'prism-react-renderer';

export default function CodeHighlight(code: string, theme: PrismTheme): React.ReactElement {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language="javascript">
      {({ tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </React.Fragment>
      )}
    </Highlight>
  );
}
