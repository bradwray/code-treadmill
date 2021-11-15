import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
   background-color: #ff628c;
   color: #193549;
   :hover {
      background-color: #c0deed;
      border: 3px solid #c0deed;
   }
`;

export default function showFeedBack({ answered, correct, error, gotIt, answer }) {
   if (answered) {
      if (correct) {
         return (
            <FeedBackRight>
               <div style={{ transform: 'translateY(13px)' }}>Right! Answer: {answer()}</div>
            </FeedBackRight>
         );
      } else if (error) {
         return (
            <FeedBackWrong>
               <div style={{ transform: 'translateY(13px)' }}>Error: {error}</div>
               <Button onClick={() => gotIt()}>Got it</Button>
            </FeedBackWrong>
         );
      } else {
         return (
            <FeedBackWrong>
               <div>answer: {answer()}</div>
               <Button onClick={() => gotIt()}>Got it</Button>
            </FeedBackWrong>
         );
      }
   } else {
      return null;
   }
}
