import { AppContext } from "../components/AppContext";
import Panel from "../components/Panel";
import React, { useContext, useEffect } from "react";
import TreadMill from "../components/TreadMill";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";

const Wrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.plain.backgroundColor + "bb"};
  display: flex;
  justify-content: center;
`;

export default function App({}) {
  const router = useRouter();
  const { id } = router.query;

  if (id) {
    return (
      <AppContext route={id}>
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
  } else {
    return null;
  }
}
