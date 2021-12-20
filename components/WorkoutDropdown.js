import React, { useContext } from "react";
import { Context } from "./AppContext";
import styled from "styled-components";
import { useRouter } from "next/router";

const Select = styled.select`
  width: 130px;
  height: 40px;
  padding-left: 5px;
  font-family: "Orbitron", sans-serif;
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
  color: ${(props) => props.theme.plain.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  margin: 10px;
`;

const Label = styled.span`
  position: absolute;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  color: ${(props) => props.theme.plain.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  z-index: 2000;
  font-size: 10px;
  transform: translateY(4px) translateX(15px);
`;

function WorkoutDropdown() {
  const [store, setStore] = useContext(Context);

  const router = useRouter();

  const handleChange = (val) => {
    router.push("/" + val);
    setStore({
      ...store,
      currentIndex: 0,
      readStats: [],
      raceStats: [],
      rpm: 0,
      avgComplexity: 0,
    });
  };
  const options = [
    "variables",
    "conditionals",
    "functions",
    "lists",
    "loops",
    "traversals",
  ];

  return (
    <div>
      <Label>Workout</Label>

      <Select
        value={store.workout}
        autoFocus={false}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((item, i) => (
          <option key={item}>{item}</option>
        ))}
      </Select>
    </div>
  );
}

export default WorkoutDropdown;
