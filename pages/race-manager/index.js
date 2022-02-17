import { AppContext, Context } from "../../components/AppContext";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/Button";
import Head from "next/head";
import Panel from "../../components/Panel";
import QuestionMaker from "../../components/QuestionMaker";
import ThemeDropdown from "../../components/ThemeDropdown";
import styled from "styled-components";
import CardContainer from "../../components/CardContainer";
import LeaderBoard from "../../components/LeaderBoard";
import Title from "../../components/Title";

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

const Btn = styled(Button)`
  margin-bottom: 80px;
`;

const RaceManager = ({}) => {
  const [state, setState] = useState({ items: [""] });
  useEffect(() => {}, []);

  return (
    <AppContext>
      <Head>
        <title>Way To Code!</title>
        {/* <meta name='viewport' content='initial-scale=1.0, width=device-width maximum-scale=1' /> */}
      </Head>
      <Toptions>
        <ThemeDropdown />
      </Toptions>
      <Wrapper>
        <CardContainer>
          <Section>
            <Title>Manage a Race</Title>
            <Btn>Start</Btn>
          </Section>

          <LeaderBoard />
        </CardContainer>
      </Wrapper>
    </AppContext>
  );
};

export default RaceManager;
