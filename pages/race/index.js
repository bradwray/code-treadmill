import { AppContext, Context } from "../../components/AppContext";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/Button";
import CardContainer from "../../components/CardContainer";
import Head from "next/head";
import LeaderBoard from "../../components/LeaderBoard";
import Link from "../../components/Link";
import Panel from "../../components/Panel";
import QuestionMaker from "../../components/QuestionMaker";
import ThemeDropdown from "../../components/ThemeDropdown";
import Title from "../../components/Title";
import { randomAnimals } from "../../utils/randomStringGenerator";
import styled from "styled-components";

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

const Input = styled.input`
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
    joined: false,
    joinCode: "",
    name: "",
    raceID: randomAnimals().toLowerCase(0) + Math.floor(Math.random() * 100),
  });
  useEffect(() => {}, []);

  const handleJoin = () => {
    setState({ ...state, joined: true });
  };

  const handleTextEntry = (val, box) => {
    if (box === "code") {
      setState({ ...state, joinCode: val });
    } else {
      setState({ ...state, name: val });
    }
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
          {state.joined ? (
            <Section>Wait for the race to begin. Stay on this page.</Section>
          ) : (
            <Section>
              <Title w="180px" xOffset="-39px">
                Join Race
              </Title>
              Enter your name and a join code.
              <Input
                onChange={(e) => handleTextEntry(e.target.value, "name")}
                autoFocus
                placeholder="your name"
              />
              <Input
                onChange={(e) => handleTextEntry(e.target.value, "code")}
                placeholder="join code"
              />
              <Btn
                disabled={state.name == "" || state.joinCode == ""}
                onClick={() => handleJoin()}
              >
                Join Race
              </Btn>
              Or...
              <Link ownLine target="_blank" href="/race-manager">
                Create your own race and invite others
              </Link>
            </Section>
          )}

          <LeaderBoard />
        </CardContainer>
      </Wrapper>
    </AppContext>
  );
};

export default RaceManager;
