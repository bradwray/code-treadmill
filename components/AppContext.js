import React, { createContext } from 'react';

import { ThemeProvider } from 'styled-components';
import vsDark from 'prism-react-renderer/themes/vsDark';

// const themes = {vsdark: }

export const Context = createContext();

export function AppContext(props) {
   const [store, setStore] = React.useState({ rpm: 74, theme: vsDark, themeName: vsDark });

   return (
      <ThemeProvider theme={store.theme}>
         <Context.Provider value={[store, setStore]}>{props.children}</Context.Provider>
      </ThemeProvider>
   );
}
