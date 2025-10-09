import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../components/AppContext';
import Button from '../../components/Button';
import QuestionMaker from '../../components/QuestionMaker';
import ThemeDropdown from '../../components/ThemeDropdown';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.plain.backgroundColor + "bb"};
`;

const Toptions = styled.div`
  background-color: ${(props) => props.theme.plain.backgroundColor};
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${(props) => props.theme.plain.color + "99"};
`;

const AddNew = styled(Button)`
  margin-bottom: 80px;
`;

const WorkoutMaker = (): React.ReactElement => {
  const [items, setItems] = useState<Array<{ solveFor?: string; content?: string }>>([{}]);

  const handleSave = ({ solveFor, content }: { solveFor: string; content: string }, index: number) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { solveFor, content };
      return next;
    });
  };

  const handleNew = () => {
    setItems((prev) => [...prev, {}]);
  };
  return (
    <AppContext>
      <Head>
        <title>Code Treadmill</title>
        {/* <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' /> */}
      </Head>
      <Toptions>
        <ThemeDropdown />
      </Toptions>
      <Wrapper>
        {items.map((item, index) => (
          <QuestionMaker key={index} i={index} submit={handleSave} />
        ))}
        <AddNew onClick={() => handleNew()}> Add New Item</AddNew>
      </Wrapper>
    </AppContext>
  );
};

export default WorkoutMaker;
