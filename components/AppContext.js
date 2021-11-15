import React, { createContext } from "react";
import defaultTheme from "prism-react-renderer/themes/vsDark";

export const Context = createContext();

export function AppContext(props) {
  const [store, setStore] = React.useState({ rpm: 74, theme: defaultTheme });
  console.log(store.theme);
  return (
    <Context.Provider value={[store, setStore]}>
      {props.children}
    </Context.Provider>
  );
}
