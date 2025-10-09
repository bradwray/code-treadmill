import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import CardContainer from './CardContainer';
import CodeRead from './CodeRead';
import CodeWrite from './CodeWrite';
import SpecialChars from './SpecialChars';
import Title from './Title';
import tagAndWeightExercise from '../utils/tagAndWeightExercise';

import type { WorkoutSlideRead } from '../types';

const Section = styled.div`
  border: 1px solid ${(props) => props.theme.plain.color + "66"};
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

const InputBox = styled.input`
  width: 100px;
  height: 30px;
  text-align: center;
  background-color: ${(props) => props.theme.plain.backgroundColor};
  border-color: ${(props) => props.theme.plain.color + "66"};
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

interface QuestionMakerProps {
  submit: (payload: { solveFor: string; content: string }, index: number) => void;
  i: number;
}

const initialQuestion = tagAndWeightExercise(`//write your code here`, '', true);

const QuestionMaker = ({ submit, i }: QuestionMakerProps): React.ReactElement => {
  const [question, setQuestion] = React.useState<WorkoutSlideRead>(initialQuestion);

  const handleFocus = () => {
    if (question.content === `//write your code here`) {
      setQuestion((prev) => ({ ...prev, content: '' }));
    }
  };

  const handleCoding = (value: string) => {
    setQuestion(tagAndWeightExercise(value, question.solveFor, true));
  };

  return (
    <CardContainer>
      <Section>
        <Title w="110px" xOffset="-40px">
          Code It
        </Title>
        <SpecialChars />

        <div>
          <CodeWrite
            handleSetCode={handleCoding}
            handleFocus={handleFocus}
            code={question.content}
          />
          <Table>
            Solving for:{' '}
            <InputBox
              onChange={(e) =>
                setQuestion((prev) => ({ ...prev, solveFor: e.target.value }))
              }
            />
          </Table>
        </div>
      </Section>

      <Section>
        <Title w="110px" xOffset="-40px">
          Test It
        </Title>
        <CodeRead questionData={question} offsetFromMiddle={0} index={0} maker />
        <ButtonContainer>
          <Button onClick={() => submit({ solveFor: question.solveFor, content: question.content }, i)}>
            Submit
          </Button>
        </ButtonContainer>
      </Section>
    </CardContainer>
  );
};

export default QuestionMaker;
