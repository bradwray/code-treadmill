import { AppContext } from "../components/AppContext";
import Panel from "../components/Panel";
import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import TreadMill from "../components/TreadMill";
import styled from "styled-components";
import Head from "next/head";

const Wrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  /* margin: -20px; */
  background: ${(props) => props.theme.plain.backgroundColor + "bb"};
  display: flex;
  justify-content: center;
`;

export default function App() {
  return (
    <AppContext>
      <Head>
        <title>codeRPM</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width maximum-scale=1"
        />
      </Head>
      <Wrapper>
        <Panel />
        <TreadMill />
      </Wrapper>
    </AppContext>
  );
}
