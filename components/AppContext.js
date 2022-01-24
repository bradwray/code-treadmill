import React, { createContext, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import nightOwl from '../themes/nightOwl.cjs.js';
import slides from '../workouts/conditionals';
import tagAndWeightCode from '../utils/tagAndWeightCode.js';

export const Context = createContext();

export function AppContext(props) {
   const [store, setStore] = React.useState({
      currentIndex: 0,
      readStats: [],
      raceStats: [],
      slides: tagAndWeightCode(slides),
      workout: '',
      rpm: 0,
      avgComplexity: 0,
      theme: nightOwl,
      themeName: 'nightOwl',
      themeNum: 0,
   });

   useEffect(() => {
      //the linter told me to do it this way
      async function importWorkout() {
         const workoutExercises = await import('../workouts/' + props.route);
         setStore({
            ...store,
            workout: props.route,
            slides: tagAndWeightCode(workoutExercises.default),
         });
      }
      if (props.route) {
         if (props.route !== store.workout) {
            importWorkout();
         }
      }
   }, [props.route]);

   return (
      <ThemeProvider theme={store.theme}>
         <Context.Provider value={[store, setStore]}>{props.children}</Context.Provider>
      </ThemeProvider>
   );
}
