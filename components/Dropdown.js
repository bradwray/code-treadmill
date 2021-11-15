import React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 200px;
  height: 40px;
`;

function Dropdown({ options, onSelect }) {
  return (
    <Select onChange={(e) => onSelect(e.target.value)}>
      {options.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </Select>
  );
}

export default Dropdown;
