import React, { createContext } from "react";
import vsDark from "prism-react-renderer/themes/vsDark";
import { ThemeProvider } from "styled-components";

// const themes = {vsdark: }

export const Context = createContext();

export function AppContext(props) {
  const [store, setStore] = React.useState({ rpm: 74, theme: vsDark });

  return (
    <ThemeProvider theme={store.theme}>
      <Context.Provider value={[store, setStore]}>
        {props.children}
      </Context.Provider>
    </ThemeProvider>
  );
}
