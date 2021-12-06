import React, { createContext, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import cobalt2 from '../codeUtils/cobalt.cjs.js';
import { slides } from '../codeUtils/jsCodeContent.js';

export const Context = createContext();

export function AppContext(props) {
   const [store, setStore] = React.useState({
      currentIndex: 0,
      readStats: [],
      slides: slides,
      rpm: 0,
      avgcomplexity: 0,
      theme: cobalt2,
      themeName: 'cobalt2',
   });
   useEffect(function () {
      console.log(window.localStorage);
   }, []);

   console.log(store);
   return (
      <ThemeProvider theme={store.theme}>
         <Context.Provider value={[store, setStore]}>{props.children}</Context.Provider>
      </ThemeProvider>
   );
}
