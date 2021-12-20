import React, { createContext, useEffect } from "react";
import "@fontsource/orbitron";
import { ThemeProvider } from "styled-components";
import cobalt2 from "../themes/cobalt.cjs.js";
import slides from "../workouts/conditionals";
import tagAndWeightCode from "../utils/tagAndWeightCode.js";

export const Context = createContext();

export function AppContext(props) {
  const [store, setStore] = React.useState({
    currentIndex: 0,
    readStats: [],
    raceStats: [],
    slides: tagAndWeightCode(slides),
    workout: "",
    rpm: 0,
    avgComplexity: 0,
    theme: cobalt2,
    themeName: "cobalt",
    themeNum: 0,
  });

  useEffect(async () => {
    if (props.route) {
      if (props.route !== store.workout) {
        const workoutExercises = await import("../workouts/" + props.route);
        setStore({
          ...store,
          workout: props.route,
          slides: tagAndWeightCode(workoutExercises.default),
        });
      }
    }
  }, [props.route]);

  console.log(store);
  return (
    <ThemeProvider theme={store.theme}>
      <Context.Provider value={[store, setStore]}>
        {props.children}
      </Context.Provider>
    </ThemeProvider>
  );
}
