import React, { useContext } from "react";

import { Context } from "./AppContext";
// import cobalt2 from "../themes/cobalt.cjs.js";
import dracula from "prism-react-renderer/themes/dracula";
import duotoneDark from "prism-react-renderer/themes/duotoneDark";
import duotoneLight from "prism-react-renderer/themes/duotoneLight";
import github from "prism-react-renderer/themes/github";
import hexThemeColors from "../codeUtils/hexThemeColors";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import oceanicNext from "prism-react-renderer/themes/oceanicNext";
import okaidia from "prism-react-renderer/themes/okaidia";
import palenight from "prism-react-renderer/themes/palenight";
import shadesOfPurple from "prism-react-renderer/themes/shadesOfPurple";
import styled from "styled-components";
import synthwave84 from "prism-react-renderer/themes/synthwave84";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";

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
    const newTheme = (
      await import("prism-react-renderer/themes/" + options[i].name)
    ).default;
    setStore({
      ...store,
      theme: hexThemeColors(newTheme),
      themeName: options[i].name,
      themeType: options[i].type,
    });
  };
  const options = [
    { name: "vsDark", type: "dark" },
    { name: "cobalt2", type: "dark" },
    { name: "nightOwl", type: "dark" },
    { name: "dracula", type: "dark" },
    { name: "duotoneDark", type: "dark" },
    { name: "oceanicNext", type: "dark" },
    { name: "okaidia", type: "dark" },
    { name: "github", type: "light" },
    { name: "duotoneLight", type: "light" },
    { name: "vsLight", type: "light" },
    { name: "synthwave84", type: "dark" },
    { name: "shadesOfPurple", type: "dark" },
    { name: "palenight", type: "dark" },
  ];
  // console.log(store);
  return (
    <div>
      <Label>Theme</Label>

      <Select
        value={store.themeName}
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
