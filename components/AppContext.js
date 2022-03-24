import React, { createContext, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import hexThemeColors from '../utils/hexThemeColors';
import io from 'socket.io-client';
import nightOwl from '../themes/nightOwl.cjs.js';
import options from '../themes/themeOptions';
import slides from '../workouts/js-variables';
import tagAndWeightCode from '../utils/tagAndWeightCode.js';

const socket = io();
let initStore = {
   currentIndex: 0,
   readStats: [],
   raceID: false,
   slides: tagAndWeightCode(slides),
   workout: '',
   rpm: 0,
   avgComplexity: 0,
   theme: nightOwl,
   themeName: 'nightOwl',
   themeNum: 0,
   leftAligned: true,
   score: 0,
};
export const Context = createContext();

export function AppContext(props) {
   const [store, setStore] = React.useState(initStore);
   initStore = store;
   useEffect(() => {
      const { route, raceID, uName } = props;
      console.log('route props');
      console.log(route, raceID, uName);
      //the linter told me to import dynamic routes this way
      async function importWorkout() {
         const workoutExercises = await import('../workouts/' + route);
         //get the theme on a route change
         console.log('import workout');
         let themeNum = window.localStorage.getItem('theme');
         const newTheme = (await import('../themes/' + options[themeNum].name + '.cjs.js')).default;
         setStore({
            ...store,
            workout: route,
            raceID: raceID,
            raceWorkout: raceID ? route : '',
            userName: uName,
            slides: tagAndWeightCode(workoutExercises.default),
            leftAligned: window.innerWidth < 900 ? false : true,
            theme: hexThemeColors(newTheme),
            themeName: options[themeNum].name,
            themeType: options[themeNum].type,
            themeNum: themeNum,
         });
      }
      if (props.route) {
         importWorkout();
      }
   }, [props.route]);

   return (
      <ThemeProvider theme={store.theme}>
         <Context.Provider value={[store, setStore]}>{props.children}</Context.Provider>
      </ThemeProvider>
   );
}
