import React, { createContext } from "react";
import { slides } from "../codeUtils/jsCodeContent.js";

import { ThemeProvider } from "styled-components";
import cobalt2 from "../codeUtils/cobalt.cjs.js";

export const Context = createContext();

export function AppContext(props) {
  const [store, setStore] = React.useState({
    slides: slides,
    rpm: 0,
    avgDifficulty: 0,
    theme: cobalt2,
    themeName: "cobalt2",
  });
  // console.log(store.theme);
  return (
    <ThemeProvider theme={store.theme}>
      <Context.Provider value={[store, setStore]}>
        {props.children}
      </Context.Provider>
    </ThemeProvider>
  );
}
