import "@fontsource/orbitron";

import React, { useContext } from "react";

import { Context } from "./AppContext";
import styled from "styled-components";

const DigitBox = styled.span`
  font-family: "Orbitron", sans-serif;
  ${(props) =>
    props.light ? `` : `box-shadow: inset 0px 0px 30px 0px black;`};

  width: 90px;
  height: 38px;
  text-align: center;
  color: ${(props) => props.theme.styles[2].style.color};
  background-color: ${(props) =>
    props.light ? "white" : "rgba(50, 20, 20, 1)"};
  font-size: 30px;
  transform: translateY(6px);
`;

const Label = styled.span`
  position: absolute;
  font-family: "Orbitron", sans-serif;
  color: ${(props) => props.theme.styles[5].style.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  font-size: 12px;
  transform: translateY(${(props) => props.bump}px);
`;

const Line = styled.hr`
  position: absolute;
  width: 110px;
  border: 0;
  transform: translateY(${(props) => props.bump}px);
  height: 2px;
  background: ${(props) => props.theme.plain.color};
`;

const OuterOutline = styled.div`
  height: 50px;
  margin: 2px;
  width: 90px;
  border: 2px solid ${(props) => props.theme.plain.color};
  border-radius: 10px;
  color: ${(props) => props.theme.plain.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  padding: 10px;
  display: flex;
  justify-content: center;
`;
export default function DigitalReadOut({ value, label, measure }) {
  const [store, setStore] = useContext(Context);
  return (
    <OuterOutline>
      <Line bump={-10} />
      <Label bump={-10}>{label}</Label>

      <DigitBox
        light={store.themeName.toLowerCase().includes("light") ? true : false}
      >
        {value}
      </DigitBox>
      <Line bump={44} />
      <Label bump={44}>{measure}</Label>
    </OuterOutline>
  );
}
