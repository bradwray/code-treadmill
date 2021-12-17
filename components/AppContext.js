import React, { createContext, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import cobalt2 from '../themes/cobalt.cjs.js';
import { slides } from '../workouts/conditionals';

export const Context = createContext();

export function AppContext(props) {
   const [store, setStore] = React.useState({
      currentIndex: 0,
      readStats: [],
      raceStats: [],
      slides: slides,
      rpm: 0,
      avgComplexity: 0,
      theme: cobalt2,
      themeName: 'cobalt',
      themeNum: 0,
   });
   console.log(store);
   //   useEffect(async () => {
   //     console.log(store);
   //     if (props.route) {
   //       const { slides } = await import("../workouts/" + props.route);
   //       setStore({
   //         ...store,
   //         slides,
   //       });
   //     }
   //   }, []);
   return (
      <ThemeProvider theme={store.theme}>
         <Context.Provider value={[store, setStore]}>{props.children}</Context.Provider>
      </ThemeProvider>
   );
}
