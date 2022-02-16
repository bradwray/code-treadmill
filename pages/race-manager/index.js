import { AppContext, Context } from "../../components/AppContext";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/Button";
import Head from "next/head";
import Panel from "../../components/Panel";
import QuestionMaker from "../../components/QuestionMaker";
import ThemeDropdown from "../../components/ThemeDropdown";
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

const AddNew = styled(Button)`
  margin-bottom: 80px;
`;

const WorkoutMaker = ({}) => {
  const [state, setState] = useState({ items: [""] });
  useEffect(() => {}, []);

  const handleSave = () => {};

  const handleNew = () => {
    setState({
      items: [...state.items, ""],
    });
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
      <Wrapper>Manage Race</Wrapper>
    </AppContext>
  );
};

export default WorkoutMaker;
