import React, { useContext } from "react";

import { Context } from "./AppContext";
import makeDimmer from "../codeUtils/makeDimmer";
import styled from "styled-components";

const DisplayContainer = styled.div`
  width: 380px;
  height: 124px;
  border: 1px solid #666;
  border-radius: 10px;
  color: ${(props) => props.theme.styles[5].style.color};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  padding-top: 8px;
  box-shadow: inset 0px 0px 2px 0px white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Display = styled.span`
  font-family: "Orbitron", sans-serif;
  ${(props) =>
    props.light
      ? `box-shadow: inset 0px 0px 30px 0px #eee;`
      : `box-shadow: inset 0px 0px 30px 0px black;`};

  width: 320px;
  height: 70px;
  color: ${(props) => props.theme.styles[2].style.color};
  background-color: ${(props) =>
    props.light ? "white" : makeDimmer(props.theme.styles[2].style.color, 0.1)};
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  transform: translateY(9px);
`;

const Bar = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  margin-right: 1px;
  background-color: ${(props) =>
    props.done ? props.theme.styles[2].style.color : null};
  border: 1px solid ${(props) => props.theme.styles[2].style.color};
  color: ${(props) => props.theme.plain.backgroundColor};
  box-shadow: 0px 0px 20px 0px
    ${(props) => props.theme.styles[2].style.color + "77"};
  font-size: 6px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  :hover {
    background-color: ${(props) => props.theme.plain.color};
    color: ${(props) => props.theme.plain.backgroundColor};
    font-size: 12px;
    transform: scale(1.2);
  }
`;

const Label = styled.span`
  position: absolute;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  background: ${(props) => props.theme.plain.backgroundColor};
  color: ${(props) => props.theme.plain.color};
  z-index: 2000;
  font-size: 25px;
  transform: translateY(${(props) => props.bump}px) translateX(8px);
`;

const Line = styled.hr`
  width: 377px;
  z-index: 0;
  transform: translateY(${(props) => props.bump}px);
  height: 3px;
  border: 0;
  background-color: ${(props) => props.theme.plain.color}; ;
`;

export default function ProgressChart() {
  const [store, setStore] = useContext(Context);
  const { slides } = store;
  return (
    <div>
      <DisplayContainer>
        <div style={{ position: "absolute" }}>
          <Label bump={-59}>Progress</Label>
          <Line bump={-55} />
        </div>
        <Display
          light={store.themeName.toLowerCase().includes("light") ? true : false}
        >
          {slides.map((item) => (
            <Bar
              done={false}
              height={item.difficulty}
              width={300 / slides.length}
            ></Bar>
          ))}
        </Display>
      </DisplayContainer>
    </div>
  );
}
