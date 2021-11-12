// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';

import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { Fragment } from 'react';
import { randomAdj, randomAnimals, randomName } from '../codeUtils/randomStringGenerator.js';

import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import theme from 'prism-react-renderer/themes/vsDark';

// theme.plain = {
//   color: "#dd1111",
//   backgroundColor: "rgba(50, 20, 20, 1)",
//   boxShadow: "inset 0px 0px 30px 0px black"
// };

const PuzzleContainer = styled.div`
   width: 100%;
   max-width: 1400px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
   font-size: 18;
   box-sizing: 'border-box';
   font-family: '"Dank Mono", "Fira Code", monospace';
`;

const InputBox = styled.input`
   bottom: 25px;
   width: 200px;
   height: 30px;
   text-align: center;
`;

const FeedBackRight = styled.div`
   font-size: 16px;
   padding-left: 10px;
   width: 100%;
   max-width: 1400px;
   text-align: center;
   color: #c0deed;
   border: 1px solid #c0deed;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   margin-top: 15px;
   border-radius: 4px;
   bottom: 30px;
   /* width: 60px; */
   min-height: 50px;
   height: 100%;
`;

const FeedBackWrong = styled.div`
   display: flex;
   justify-content: space-between;
   font-size: 16px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   margin-top: 15px;
   padding-left: 10px;
   width: 100%;
   max-width: 1400px;
   bottom: 30px;
   border: 1px solid #ff628c;
   border-radius: 4px;
   color: #ff628c;
   /* width: 60px; */
   min-height: 50px;
   height: 100%;
`;

const BottomContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

const SolvingFor = styled.span`
   display: inline-block;
   font-size: 18px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   margin-right: 14px;
   margin-left: 14px;
`;

const Button = styled.button`
   background-color: #ff628c;
   color: #193549;
   :hover {
      background-color: #c0deed;
      border: 3px solid #c0deed;
   }
`;

const fillIt = (codeString) => {
   // console.log("filling ", codeString);
   var newCodeString = codeString;
   while (
      newCodeString.indexOf('##') >= 0 ||
      newCodeString.indexOf('#-#') >= 0 ||
      newCodeString.indexOf('#.#') >= 0 ||
      newCodeString.indexOf('@@') >= 0 ||
      newCodeString.indexOf('^^') >= 0 ||
      newCodeString.indexOf('**') >= 0 ||
      newCodeString.indexOf('$$') >= 0
   ) {
      newCodeString = newCodeString.replace('#-#', Math.ceil(Math.random() * 7) + 9);
      newCodeString = newCodeString.replace('#.#', Math.random().toFixed(2));
      newCodeString = newCodeString.replace('##', Math.floor(Math.random() * 7));
      newCodeString = newCodeString.replace('$$', `"${randomAdj()}"`);
      newCodeString = newCodeString.replace('^^', `"${randomName()}"`);
      newCodeString = newCodeString.replace('**', `${Math.random() > 0.5 ? true : false}`);
      newCodeString = newCodeString.replace('@@', `"${randomAnimals()}"`);
   }
   // console.log("filled with", newCodeString);
   return newCodeString;
};

function Puzzle({ content, solveFor, moveSlide, offsetFromMiddle }) {
   const [state, setState] = React.useState({
      code: null,
      answered: false,
      correct: false,
      inputVal: '',
   });
   // console.log("content ", content);
   React.useEffect(() => {
      setState({
         ...state,
         code: fillIt(content),
      });
   }, [content]);

   const gotIt = () => {
      setState({
         ...state,
         answered: false,
         correct: false,
         code: fillIt(content),
         inputVal: '',
      });
   };

   const evalCode = (code) => {
      var wholeEval = code + '\n' + solveFor;
      return window.eval(wholeEval);
   };

   const highlight = (code) => (
      <Highlight {...defaultProps} theme={theme} code={code} language='jsx'>
         {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
               {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                     {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                     ))}
                  </div>
               ))}
            </Fragment>
         )}
      </Highlight>
   );

   const handleChange = (e) => {
      if (e.key === 'Enter') {
         if (
            evalCode(state.code).toString().toLowerCase() == e.target.value.toLowerCase().trim() &&
            !state.answered
         ) {
            setTimeout(() => {
               setState({
                  ...state,
                  answered: false,
                  correct: false,
                  inputVal: '',
               });
               moveSlide(-1);
            }, 1000);
            setState({
               ...state,
               answered: true,
               correct: true,
            });
         } else {
            setState({
               ...state,
               answered: true,
               correct: false,
            });
         }
      } else {
         // console.log(e.target.value);
         setState({
            ...state,
            inputVal: e.target.value,
         });
      }
   };

   const showFeedBack = () => {
      const { answered, correct, code } = state;
      if (answered) {
         if (correct) {
            return (
               <FeedBackRight>
                  <div style={{ transform: 'translateY(13px)' }}>
                     Right! Answer: {evalCode(code)}
                  </div>
               </FeedBackRight>
            );
         } else {
            return (
               <FeedBackWrong>
                  <div>answer: {evalCode(code)}</div>
                  <Button onClick={() => gotIt()}>Got it</Button>
               </FeedBackWrong>
            );
         }
      } else {
         return <div />;
      }
   };
   // console.log(theme);
   return (
      <PuzzleContainer>
         <Editor
            value={state.code ? state.code : content}
            highlight={highlight}
            onValueChange={() => {}}
            padding={10}
            style={{
               fontSize: 18,
               width: '100%',
               maxWidth: '1200px',
               border: '1px solid #555',
               boxSizing: 'border-box',
               fontFamily: '"Dank Mono", "Fira Code", monospace',
               ...theme.plain,
            }}
         />

         <BottomContainer>
            {offsetFromMiddle == 0 && state.code ? (
               <div>
                  <SolvingFor>
                     {solveFor} {' == '}
                  </SolvingFor>
                  <InputBox
                     style={
                        evalCode(state.code).length > 10 ? { width: '300px' } : { width: '80px' }
                     }
                     value={state.inputVal}
                     // autoFocus
                     onChange={handleChange}
                     onKeyDown={handleChange}
                  />
               </div>
            ) : null}
            {showFeedBack()}
         </BottomContainer>
      </PuzzleContainer>
   );
}

export default Puzzle;
