import React, { useContext, useEffect } from "react";

import { Context } from "./AppContext";
import hexThemeColors from "../utils/hexThemeColors";
import options from "../themes/themeOptions";
import styled from "styled-components";

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

function Dropdown() {
  const [store, setStore] = useContext(Context);

  useEffect(function () {
    let themeNum = window.localStorage.getItem("theme");
    if (themeNum) {
      setTheme(themeNum);
    }
  }, []);

  const setTheme = async (i) => {
    const newTheme = (await import("../themes/" + options[i].name + ".cjs.js"))
      .default;
    console.log(options[i].name);
    setStore({
      ...store,
      theme: hexThemeColors(newTheme),
      themeName: options[i].name,
      themeType: options[i].type,
      themeNum: i,
    });
  };

  const handleChange = async (i) => {
    window.localStorage.setItem("theme", i);
    setTheme(i);
  };

  return (
    <div>
      <Label>Theme</Label>

      <Select
        value={store.themeNum}
        autoFocus={false}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((item, i) => (
          <option value={i} key={i}>
            {item.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;
