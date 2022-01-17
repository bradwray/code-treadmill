import React, { Component, Fragment } from 'react';

import CodeRead from './CodeRead.js';
import CodeWrite from './CodeWrite.js';
import SpecialChars from './SpecialChars.js';
import styled from 'styled-components';

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
   border: 1px solid #aaa6;
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
`;

const Submit = styled.button`
   width: 125px;
   height: 50px;
   font-size: 25px;
   transform: translateY(40px) translateX(460px);
   font-family: 'Dank Mono', 'Fira Code', monospace;
`;

function QuestionMaker() {
   const [code, setCode] = React.useState(`//write your code here`);
   const [solveFor, setSolveFor] = React.useState('');
   const [passedTest, setPassedTest] = React.useState(true);

   const handleFocus = () => {
      if (code === `//write your code here`) {
         let tempCode = code.replace(`//write your code here`, '');
         setCode(tempCode);
      }
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
               <CodeWrite handleSetCode={setCode} handleFocus={handleFocus} code={code} />
               <Table>
                  Solving for: <InputBox onChange={(e) => setSolveFor(e.target.value)} />
               </Table>
            </div>
         </Section>

         <Section>
            <Title>Test It</Title>
            <CodeRead
               solveFor={solveFor}
               content={code === `//write your code here` ? '' : code}
               moveSlide={handleGoodTest}
               offsetFromMiddle={0}
            />
            {passedTest ? <Submit>Submit</Submit> : null}
         </Section>
      </CardContainer>
   );
}

export default QuestionMaker;
