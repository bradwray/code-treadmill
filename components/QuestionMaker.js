import React, { Component, Fragment } from 'react';

import Button from './Button.js';
import CodeRead from './CodeRead.js';
import CodeWrite from './CodeWrite.js';
import SpecialChars from './SpecialChars.js';
import styled from 'styled-components';
import tagAndWeightExercise from '../utils/tagAndWeightExercise.js';

const CardContainer = styled.div`
   border: 1px solid #ddd;
   background-color: ${(props) => props.theme.plain.backgroundColor};
   color: ${(props) => props.theme.plain.color};
   font-family: 'Dank Mono', 'Fira Code', monospace;
   margin-bottom: 20px;
   min-height: 600px;
   width: 90%;
   max-width: 1400px;
   font-size: 25px;
   top: 4%;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   padding: 40px;
`;

const Section = styled.div`
   border: 1px solid ${(props) => props.theme.plain.color + '66'};
   padding: 30px;
   margin: 25px;
   width: 100%;
   max-width: 750px;
   min-height: 450px;
`;

const Table = styled.table`
   border: 1px solid #aaa6;
   padding: 10px;
   padding-left: 90px;
   padding-right: 90px;
   margin: 0 auto;
   margin-bottom: 10px;
   width: 100%;
   font-size: 15px;
`;

const Title = styled.div`
   transform: translateY(-44px) translateX(-40px) rotate(-5deg);
   width: 110px;
   animation-name: spin;
   animation-iteration-count: 3;
   animation-duration: 0.1s;
   @keyframes spin {
      0% {
         transform: translateY(-44px) translateX(-40px) rotate(0deg);
      }
      100% {
         transform: translateY(-44px) translateX(-40px) rotate(-360deg);
      }
   }
`;

const InputBox = styled.input`
   width: 100px;
   height: 30px;
   text-align: center;
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border-color: ${(props) => props.theme.plain.color + '66'};
   border-radius: 2px;
   filter: brightness(130%);
   color: ${(props) => props.theme.plain.color};
`;

const ButtonContainer = styled.div`
   width: 100%;
   display: flex;
   height: 25%;
   align-items: flex-end;
   justify-content: flex-end;
`;

function QuestionMaker() {
   const [state, setState] = React.useState({ content: `//write your code here`, solveFor: '' });
   const [solveFor, setSolveFor] = React.useState('');
   const [passedTest, setPassedTest] = React.useState(true);

   const handleFocus = () => {
      if (state.content === `//write your code here`) {
         let tempCode = state.content.replace(`//write your code here`, '');
         setState({ ...state, content: tempCode });
      }
   };

   const handleCoding = (val) => {
      setState(tagAndWeightExercise(val, state.solveFor, true));
   };

   const handleGoodTest = () => {
      setPassedTest(true);
   };
   return (
      <CardContainer>
         <Section>
            <Title>Code It</Title>
            <SpecialChars />

            <div>
               <CodeWrite
                  handleSetCode={handleCoding}
                  handleFocus={handleFocus}
                  code={state.content}
               />
               <Table>
                  Solving for:{' '}
                  <InputBox onChange={(e) => setState({ ...state, solveFor: e.target.value })} />
               </Table>
            </div>
         </Section>

         <Section>
            <Title>Test It</Title>
            <CodeRead
               questionData={state}
               moveSlide={handleGoodTest}
               offsetFromMiddle={0}
               maker={true}
            />
            <ButtonContainer>{passedTest ? <Button>Submit</Button> : null}</ButtonContainer>
         </Section>
      </CardContainer>
   );
}

export default QuestionMaker;
