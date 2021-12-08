import { AppContext } from "../components/AppContext";
import Panel from "../components/Panel";
import React, { useContext } from "react";

import { Context } from "../components/AppContext";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import TreadMill from "../components/TreadMill";
import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.plain.backgroundColor + "bb"};
  display: flex;
  justify-content: center;
`;

export default function App() {
  const [store, setStore] = useContext(Context);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <AppContext>
      <Wrapper>
        <Panel />
        <TreadMill />
      </Wrapper>
    </AppContext>
  );
}
