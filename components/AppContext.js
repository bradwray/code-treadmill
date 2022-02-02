import React, { createContext, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import io from 'socket.io-client';
import nightOwl from '../themes/nightOwl.cjs.js';
import slides from '../workouts/variables';
import tagAndWeightCode from '../utils/tagAndWeightCode.js';

const socket = io();

export const Context = createContext();

export function AppContext(props) {
   const [store, setStore] = React.useState({
      currentIndex: 0,
      readStats: [],
      raceStats: [
         {
            user: 'Brad',
            rpm: 2,
            avgComplexity: 7,
         },
      ],
      slides: tagAndWeightCode(slides),
      workout: '',
      rpm: 0,
      avgComplexity: 0,
      theme: nightOwl,
      themeName: 'nightOwl',
      themeNum: 0,
      leftAligned: true,
   });
   //   console.log(store);
   useEffect(() => {
      //the linter told me to do it this way
      async function importWorkout() {
         const workoutExercises = await import('../workouts/' + props.route);
         setStore({
            ...store,
            workout: props.route,
            slides: tagAndWeightCode(workoutExercises.default),
            leftAligned: window.innerWidth < 900 ? false : true,
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
