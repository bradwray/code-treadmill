import { AppContext } from "../components/AppContext";
import Panel from "../components/Panel";
import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import TreadMill from "../components/TreadMill";
import styled from "styled-components";

const Wrapper = styled.div`
  // overflow: hidden;
  height: 100vh;
  border: 1px solid red;
  width: 100vw;
  margin: -20px;
  background: ${(props) => props.theme.plain.backgroundColor + "bb"};
  display: flex;
  justify-content: center;
`;

export default function App() {
  const [flips, setflips] = React.useState([Date.now()]);
  const [rpm, setRPM] = React.useState(0);

  //things to add to context, prism theme, rpm, progress
  const updateStats = () => {
    let tempFlips = flips;
    tempFlips[tempFlips.length] = Date.now();
    // console.log(tempFlips);
    let avgSPF =
      tempFlips
        .map((item, i) => {
          return i > 0 ? item - tempFlips[i - 1] : 0;
        })
        .reduce((a, b) => a + b) / tempFlips.length;
  };
  return (
    <AppContext>
      <Wrapper>
        <Panel />
        <TreadMill updateStats={updateStats} />
      </Wrapper>
    </AppContext>
  );
}
