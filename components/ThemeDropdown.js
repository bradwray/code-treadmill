import React, { useContext } from "react";

import { Context } from "./AppContext";
import dracula from "prism-react-renderer/themes/dracula";
import duotoneDark from "prism-react-renderer/themes/duotoneDark";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import oceanicNext from "prism-react-renderer/themes/oceanicNext";
import okaidia from "prism-react-renderer/themes/okaidia";
import styled from "styled-components";
import vsDark from "prism-react-renderer/themes/vsDark";

import palenight from "prism-react-renderer/themes/palenight";
import shadesOfPurple from "prism-react-renderer/themes/shadesOfPurple";
import synthwave84 from "prism-react-renderer/themes/synthwave84";
import vsLight from "prism-react-renderer/themes/vsLight";
import duotoneLight from "prism-react-renderer/themes/duotoneLight";
import github from "prism-react-renderer/themes/github";
import cobalt2 from "../codeUtils/cobalt.cjs.js";

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
      setStore({ ...store, theme: vsDark, themeName: "vsDark" });
    } else if (val == "nightOwl") {
      setStore({ ...store, theme: nightOwl, themeName: "nightOwl" });
    } else if (val == "dracula") {
      setStore({ ...store, theme: dracula, themeName: "dracula" });
    } else if (val == "duotoneDark") {
      setStore({ ...store, theme: duotoneDark, themeName: "duotoneDark" });
    } else if (val == "oceanicNext") {
      setStore({ ...store, theme: oceanicNext, themeName: "oceanicNext" });
    } else if (val == "okaidia") {
      setStore({ ...store, theme: okaidia, themeName: "okaidia" });
    } else if (val == "github (light)") {
      setStore({ ...store, theme: github, themeName: "github (light)" });
    } else if (val == "duotoneLight") {
      setStore({ ...store, theme: duotoneLight, themeName: "duotoneLight" });
    } else if (val == "vsLight") {
      setStore({ ...store, theme: vsLight, themeName: "vsLight" });
    } else if (val == "synthwave84") {
      setStore({ ...store, theme: synthwave84, themeName: "synthwave84" });
    } else if (val == "shadesOfPurple") {
      setStore({
        ...store,
        theme: shadesOfPurple,
        themeName: "shadesOfPurple",
      });
    } else if (val == "palenight") {
      setStore({ ...store, theme: palenight, themeName: "palenight" });
    } else if (val == "cobalt2") {
      setStore({ ...store, theme: cobalt2, themeName: "cobalt2" });
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
  console.log(store);
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
