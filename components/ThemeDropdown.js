import React, { useContext } from "react";

import { Context } from "./AppContext";
import cobalt2 from "../codeUtils/cobalt.cjs.js";
import dracula from "prism-react-renderer/themes/dracula";
import duotoneDark from "prism-react-renderer/themes/duotoneDark";
import duotoneLight from "prism-react-renderer/themes/duotoneLight";
import github from "prism-react-renderer/themes/github";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import oceanicNext from "prism-react-renderer/themes/oceanicNext";
import okaidia from "prism-react-renderer/themes/okaidia";
import palenight from "prism-react-renderer/themes/palenight";
import shadesOfPurple from "prism-react-renderer/themes/shadesOfPurple";
import styled from "styled-components";
import synthwave84 from "prism-react-renderer/themes/synthwave84";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";
import hexThemeColors from "../codeUtils/hexThemeColors";

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
  const handleChange = (val) => {
    if (val == "vsDark") {
      setStore({
        ...store,
        theme: hexThemeColors(vsDark),
        themeName: "vsDark",
      });
    } else if (val == "nightOwl") {
      setStore({
        ...store,
        theme: hexThemeColors(nightOwl),
        themeName: "nightOwl",
      });
    } else if (val == "dracula") {
      setStore({
        ...store,
        theme: hexThemeColors(dracula),
        themeName: "dracula",
      });
    } else if (val == "duotoneDark") {
      setStore({
        ...store,
        theme: hexThemeColors(duotoneDark),
        themeName: "duotoneDark",
      });
    } else if (val == "oceanicNext") {
      setStore({
        ...store,
        theme: hexThemeColors(oceanicNext),
        themeName: "oceanicNext",
      });
    } else if (val == "okaidia") {
      setStore({
        ...store,
        theme: hexThemeColors(okaidia),
        themeName: "okaidia",
      });
    } else if (val == "github (light)") {
      setStore({
        ...store,
        theme: hexThemeColors(github),
        themeName: "github (light)",
      });
    } else if (val == "duotoneLight") {
      setStore({
        ...store,
        theme: hexThemeColors(duotoneLight),
        themeName: "duotoneLight",
      });
    } else if (val == "vsLight") {
      setStore({
        ...store,
        theme: hexThemeColors(vsLight),
        themeName: "vsLight",
      });
    } else if (val == "synthwave84") {
      setStore({
        ...store,
        theme: hexThemeColors(synthwave84),
        themeName: "synthwave84",
      });
    } else if (val == "shadesOfPurple") {
      setStore({
        ...store,
        theme: hexThemeColors(shadesOfPurple),
        themeName: "shadesOfPurple",
      });
    } else if (val == "palenight") {
      setStore({
        ...store,
        theme: hexThemeColors(palenight),
        themeName: "palenight",
      });
    } else if (val == "cobalt2") {
      setStore({
        ...store,
        theme: hexThemeColors(cobalt2),
        themeName: "cobalt2",
      });
    }
  };
  const options = [
    "vsDark",
    "cobalt2",
    "nightOwl",
    "dracula",
    "duotoneDark",
    "oceanicNext",
    "okaidia",
    "github (light)",
    "duotoneLight",
    "vsLight",
    "synthwave84",
    "shadesOfPurple",
    "palenight",
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
          <option key={i}>{item}</option>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;
