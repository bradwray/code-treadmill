import React, { createContext } from "react";

import { ThemeProvider } from "styled-components";
import cobalt2 from "../codeUtils/cobalt.cjs.js";

// const themes = {vsdark: }

export const Context = createContext();

export function AppContext(props) {
  const [store, setStore] = React.useState({
    rpm: 74,
    theme: cobalt2,
    themeName: "cobalt2",
  });

  return (
    <ThemeProvider theme={store.theme}>
      <Context.Provider value={[store, setStore]}>
        {props.children}
      </Context.Provider>
    </ThemeProvider>
  );
}
