import React, { createContext, useEffect } from "react";
import options from "../themes/themeOptions";
import hexThemeColors from "../utils/hexThemeColors";
import { ThemeProvider } from "styled-components";
import io from "socket.io-client";
import nightOwl from "../themes/nightOwl.cjs.js";
import slides from "../workouts/js-variables";
import tagAndWeightCode from "../utils/tagAndWeightCode.js";

const socket = io();

export const Context = createContext();

export function AppContext(props) {
  const [store, setStore] = React.useState({
    currentIndex: 0,
    readStats: [],
    raceStats: [
      {
        user: "Brad",
        rpm: 2,
        avgComplexity: 7,
      },
    ],
    slides: tagAndWeightCode(slides),
    workout: "",
    rpm: 0,
    avgComplexity: 0,
    theme: nightOwl,
    themeName: "nightOwl",
    themeNum: 0,
    leftAligned: true,
    score: 0,
  });
  //   console.log(store);
  useEffect(() => {
    //the linter told me to import dynamic routes this way
    async function importWorkout() {
      const workoutExercises = await import("../workouts/" + props.route);
      let themeNum = window.localStorage.getItem("theme");
      const newTheme = (
        await import("../themes/" + options[themeNum].name + ".cjs.js")
      ).default;
      setStore({
        ...store,
        workout: props.route,
        slides: tagAndWeightCode(workoutExercises.default),
        leftAligned: window.innerWidth < 900 ? false : true,
        theme: hexThemeColors(newTheme),
        themeName: options[themeNum].name,
        themeType: options[themeNum].type,
        themeNum: themeNum,
      });
    }
    if (props.route) {
      if (props.route !== store.workout) {
        importWorkout();
      }
    }

    //  if (themeNum) {
    //    setTheme(themeNum);
    //  }
  }, [props.route]);

  return (
    <ThemeProvider theme={store.theme}>
      <Context.Provider value={[store, setStore]}>
        {props.children}
      </Context.Provider>
    </ThemeProvider>
  );
}
