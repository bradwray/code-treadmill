import { AppContext } from "../components/AppContext";
import Panel from "../components/Panel";
import React from "react";
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

export default function App({}) {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  if (id) {
    return (
      <AppContext>
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
