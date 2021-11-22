import Highlight, { defaultProps } from "prism-react-renderer";
import React, { Fragment } from "react";
import styled from "styled-components";
import mdnAble from "../codeUtils/mdnAble";

// const LineNum = styled.span`
//   position: absolute;
//   display: block;
//   background: red;
//   width: 40px;
//   color: ${(props) => props.theme.plain.color + "66"};
// `;

const ClickableToken = styled.a`
  pointer-events: all;
  cursor: pointer;
  display: inline-block;
  transform: scale(1);
  :hover {
    transform: scale(1.5);
  }
`;

function CodeHighlight(code, t) {
  // console.log(t);
  return (
    <Highlight {...defaultProps} theme={t} code={code} language="javascript">
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {console.log(tokens)}
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                console.log(token);
                return mdnAble(token.content) ? (
                  <ClickableToken
                    key={key}
                    {...getTokenProps({ token, key })}
                  />
                ) : (
                  <span key={key} {...getTokenProps({ token, key })} />
                );
              })}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );
}

export default CodeHighlight;
