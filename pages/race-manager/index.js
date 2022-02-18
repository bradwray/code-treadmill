import { AppContext, Context } from "../../components/AppContext";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/Button";
import CardContainer from "../../components/CardContainer";
import Head from "next/head";
import LeaderBoard from "../../components/LeaderBoard";
import Panel from "../../components/Panel";
import QuestionMaker from "../../components/QuestionMaker";
import ThemeDropdown from "../../components/ThemeDropdown";
import Title from "../../components/Title";
import styled from "styled-components";
import { randomAnimals } from "../../utils/randomStringGenerator";
import Link from "../../components/Link";

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

const Btn = styled(Button)`
  display: block;
  bottom: 0px;
  right: 0px;
  margin-top: 10%;
  margin-left: 80%;
`;

const RaceCode = styled.div`
  display: block;
  width: 700px;
  text-align: center;
  margin: 0 auto;
  margin-top: 80px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.plain.color};
  color: ${(props) => props.theme.styles[2].style.color};
  font-size: 80px;
`;

const RaceManager = ({}) => {
  const [state, setState] = useState({
    began: false,
    raceID: randomAnimals().toLowerCase(0) + Math.floor(Math.random() * 100),
  });
  useEffect(() => {}, []);

  const handleStart = () => {
    setState({ ...state, began: true });
  };

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
            <Title w="180px" xOffset="-39px">
              Manage Race
            </Title>
            Participants should go to{" "}
            <Link ownLine target="_blank" href="https://www.waytocode.dev/race">
              https://www.waytocode.dev/race
            </Link>
            and Enter this race code <RaceCode>{state.raceID}</RaceCode>
            <Btn onClick={() => handleStart()}>Start Race</Btn>
          </Section>

          <LeaderBoard />
        </CardContainer>
      </Wrapper>
    </AppContext>
  );
};

export default RaceManager;
