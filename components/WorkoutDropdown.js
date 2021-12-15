import React, { useContext } from "react";
import { Context } from "./AppContext";
import hexThemeColors from "../codeUtils/hexThemeColors";
import styled from "styled-components";

const Select = styled.select`
  width: 130px;
  height: 40px;
  padding-left: 5px;
  font-family: "Orbitron", sans-serif;
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
  color: ${(props) => props.theme.plain.color};
  background: ${(props) => props.theme.plain.backgroundColor};
`;

const Label = styled.span`
  position: absolute;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  color: ${(props) => props.theme.plain.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  z-index: 2000;
  font-size: 10px;
  transform: translateY(-6px) translateX(8px);
`;

function Dropdown() {
  const [store, setStore] = useContext(Context);
  const handleChange = async (i) => {
    const newWorkout = (await import("../workouts/" + options[i])).default;
    setStore({
      ...store,
      workout: options[i],
      slides: newWorkout,
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
  console.log(store);
  return (
    <div>
      <Label>Workout</Label>

      <Select
        value={store.workout}
        autoFocus={false}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((item, i) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;
