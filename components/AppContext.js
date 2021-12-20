import React, { createContext, useEffect } from "react";

import { ThemeProvider } from "styled-components";
import cobalt2 from "../themes/cobalt.cjs.js";
import { slides } from "../workouts/conditionals";

export const Context = createContext();

export function AppContext(props) {
  const loadSlides = async () => {
    return await import("../workouts/" + props.route);
  };

  const [store, setStore] = React.useState({
    currentIndex: 0,
    readStats: [],
    raceStats: [],
    slides: slides,
    workout: "",
    rpm: 0,
    avgComplexity: 0,
    theme: cobalt2,
    themeName: "cobalt",
    themeNum: 0,
  });

  useEffect(() => {
    if (props.route) {
      if (props.route !== store.workout) {
        console.log(props.route);
        loadSlides().then((slidesFromRoute) => {
          setStore({
            ...store,
            workout: props.route,
            slides: slidesFromRoute.slides,
          });
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
