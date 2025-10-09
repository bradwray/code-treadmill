import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import hexThemeColors from '../utils/hexThemeColors';
import nightOwl from '../themes/nightOwl.cjs.js';
import options from '../themes/themeOptions';
import defaultSlides from '../workouts/js-variables';
import tagAndWeightCode from '../utils/tagAndWeightCode';

import type { AppStore, WorkoutModule } from '../types';

interface AppContextProps {
  route?: string;
  raceID?: string;
  uName?: string;
  children: React.ReactNode;
}

const initialStore: AppStore = {
  currentIndex: 0,
  readStats: [],
  raceID: false,
  slides: tagAndWeightCode(defaultSlides),
  workout: '',
  rpm: 0,
  avgComplexity: 0,
  theme: hexThemeColors(nightOwl as any),
  themeName: 'nightOwl',
  themeNum: 0,
  leftAligned: true,
  score: 0,
};

const noopDispatch: React.Dispatch<React.SetStateAction<AppStore>> = () => undefined;

export const Context = createContext<[AppStore, React.Dispatch<React.SetStateAction<AppStore>>]>([
  initialStore,
  noopDispatch,
]);

export function AppContext({ children, raceID, route, uName }: AppContextProps) {
  const [store, setStore] = useState<AppStore>(initialStore);

  useEffect(() => {
    if (!route) {
      return;
    }

    const importWorkout = async () => {
      try {
        const workoutModule = (await import(`../workouts/${route}`)) as WorkoutModule;
        const storedTheme = window.localStorage.getItem('theme');
        const themeIndexRaw = storedTheme ? Number(storedTheme) : 0;
        const themeIndex = Number.isNaN(themeIndexRaw) ? 0 : themeIndexRaw;
        const themeOption = options[themeIndex] ?? options[0];
        const themeModule = await import(`../themes/${themeOption.name}.cjs.js`);
        const nextTheme = hexThemeColors(themeModule.default);

        setStore((prev) => ({
          ...prev,
          workout: route ?? '',
          raceID: raceID ?? false,
          raceWorkout: raceID ? route : '',
          userName: uName,
          slides: tagAndWeightCode(workoutModule.default),
          leftAligned: window.innerWidth >= 900,
          theme: nextTheme,
          themeName: themeOption.name,
          themeType: themeOption.type,
          themeNum: themeIndex,
        }));
      } catch (error) {
        console.error('Failed to load workout or theme', error);
      }
    };

    importWorkout();
  }, [raceID, route, uName]);

  return (
    <ThemeProvider theme={store.theme}>
      <Context.Provider value={[store, setStore]}>{children}</Context.Provider>
    </ThemeProvider>
  );
}
