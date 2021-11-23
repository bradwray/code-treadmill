import Highlight, { defaultProps } from "prism-react-renderer";
import React, { Fragment } from "react";

import mdnAble from "../codeUtils/mdnAble";
import styled from "styled-components";

// const LineNum = styled.span`
//   position: absolute;
//   display: block;
//   background: red;
//   width: 40px;
//   color: ${(props) => props.theme.plain.color + "66"};
// `;

function CodeHighlight(code, t) {
  // console.log(t);
  return (
    <Highlight {...defaultProps} theme={t} code={code} language="javascript">
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );
}

export default CodeHighlight;
