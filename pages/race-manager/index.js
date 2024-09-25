import React from "react";

import { AppContext } from "../../components/AppContext";
import Head from "next/head";
import ThemeDropdown from "../../components/ThemeDropdown";
import styled from "styled-components";
import RaceManage from "../../components/RaceManage";

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

const RaceManager = ({}) => {
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
        <RaceManage />
      </Wrapper>
    </AppContext>
  );
};

export default RaceManager;
