import React, { useContext } from "react";
import { Context } from "./AppContext";
import styled from "styled-components";
import vsDark from "prism-react-renderer/themes/vsDark";
import nightOwl from "prism-react-renderer/themes/nightOwl";

const Select = styled.select`
  width: 200px;
  height: 40px;
`;

function Dropdown({ options, onSelect }) {
  const [store, setStore] = useContext(Context);
  const handleChange = (val) => {
    if (val == "vsDark") {
      setStore({ ...store, theme: vsDark });
    } else if (val == "nightOwl") {
      setStore({ ...store, theme: nightOwl });
    }
  };

  return (
    <Select onChange={(e) => handleChange(e.target.value)}>
      {options.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </Select>
  );
}

export default Dropdown;
