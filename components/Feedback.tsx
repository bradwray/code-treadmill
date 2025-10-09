import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import evalCode from '../utils/evalCode';

interface FeedbackProps {
  answered: boolean;
  correct: boolean;
  error?: string;
  gotIt: () => void;
  code: string;
  solveFor: string;
  isPseudo: boolean;
}

const FeedBack = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding-left: 10px;
  width: 100%;
  max-width: 1400px;
  color: #c0deed;
  border: 1px solid #c0deed;
  font-family: 'Dank Mono', 'Fira Code', monospace;
  margin-top: 15px;
  border-radius: 4px;
  min-height: 45px;
  height: 100%;
`;

const FeedBackRight = styled(FeedBack)`
  color: ${(props) => props.theme.styles[4].style.color};
  border: 1px solid ${(props) => props.theme.styles[4].style.color};
`;

const FeedBackWrong = styled(FeedBack)`
  color: ${(props) => props.theme.styles[6].style.color};
  border: 1px solid ${(props) => props.theme.styles[6].style.color};
`;

const congrats: string[] = ['Nice!', 'Way to go!', 'Awesome!', 'Great!', 'Heck yeah!', 'Sweet!', 'Fantastic!', 'Oh yeah!'];
const sorry: string[] = ['Sorry...', 'Not quite...', 'Woops...', 'Shoot...', 'Incorrect...', 'Wrong...', `¯\\_(ツ)_/¯`, 'Uh oh...'];

const randomPick = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

export default function showFeedBack({
  answered,
  correct,
  error,
  gotIt,
  code,
  solveFor,
  isPseudo,
}: FeedbackProps): React.ReactElement | null {
  if (!answered) {
    return null;
  }

  const answer = evalCode(code, solveFor, isPseudo);

  if (correct) {
    return (
      <FeedBackRight>
        <div style={{ transform: 'translateY(13px)' }}>
          {randomPick(congrats)} Answer: {answer}
        </div>
      </FeedBackRight>
    );
  }

  if (error) {
    return (
      <FeedBackWrong>
        <div style={{ transform: 'translateY(13px)' }}>Error: {error}</div>
        <Button onClick={gotIt}>Got it</Button>
      </FeedBackWrong>
    );
  }

  return (
    <FeedBackWrong>
      <div>
        {randomPick(sorry)} Answer: {answer}
      </div>
      <Button onClick={gotIt}>Try Again</Button>
    </FeedBackWrong>
  );
}
