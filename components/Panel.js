import React, { useContext } from "react";

import { Context } from "./AppContext";
import ResultsDisplay from "./ResultsDisplay";
import ThemeDropdown from "./ThemeDropdown";
import styled from "styled-components";
import ProgressChart from "./ProgressChart";

const TopAligned = styled.div`
  position: absolute;
  /* transform: translateX(-10px) translateY(-10px); */
  display: flex;
  height: 165px;
  color: ${(props) => props.theme.styles[5].style.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  z-index: 1000;
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
  // border: 1px solid red;
`;

const LeftAligned = styled.div`
  transform: translateX(15px);
  padding-top: 50px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
  justify-content: space-around;
  width: 400px;
  height: 100vh;
  color: ${(props) => props.theme.styles[5].style.color};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  z-index: 1000;
`;

const Button = styled.button`
  color: ${(props) => props.theme.styles[5].style.color};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  color: #aaa;
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
`;

export default function Panel() {
  const [leftAligned, setLeftAigned] = React.useState(false);

  const [store, setStore] = useContext(Context);

  const handleTheme = (themeChoice) => {
    setStore({
      ...store,
      theme: themeChoice,
    });
  };

  const Surface = leftAligned ? LeftAligned : TopAligned;
  return (
    <Surface>
      <Button onClick={() => setLeftAigned(!leftAligned)}>
        {!leftAligned ? `⤵` : `⤴`}
      </Button>

      <ThemeDropdown />
      <ResultsDisplay />
      <ProgressChart />
    </Surface>
  );
}
