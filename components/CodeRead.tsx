import React, { useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { useRouter } from 'next/router';

import Attention from './Attention';
import CodeHighlight from './CodeHighlight';
import CodeReadInfo from './CodeReadInfo';
import Feedback from './Feedback';
import { Context } from './AppContext';

import evalCode from '../utils/evalCode';
import fillItAndPrettify from '../utils/fillItAndPrettify';
import jsToPseudoCode from '../utils/jsToPseudoCode';

import type {
  ClientToServerEvents,
  ReadStat,
  ServerToClientEvents,
  WorkoutSlideRead,
} from '../types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const CodeReadContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 18px;
  box-sizing: border-box;
  font-family: 'Dank Mono', 'Fira Code', monospace;
`;

const InputBox = styled.input<{ wide: boolean }>`
  bottom: 25px;
  width: ${(props) => (props.wide ? '200px' : '60px')};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  border-color: ${(props) => props.theme.plain.color + '66'};
  border-radius: 2px;
  filter: brightness(130%);
  color: ${(props) => props.theme.plain.color};
  height: 30px;
  text-align: center;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 60px;
`;

const SolvingFor = styled.span`
  display: inline-block;
  font-size: 18px;
  font-family: 'Dank Mono', 'Fira Code', monospace;
  margin-right: 14px;
  margin-left: 5px;
  color: ${(props) => props.theme.plain.color};
`;

interface CodeReadProps {
  questionData: WorkoutSlideRead;
  offsetFromMiddle: number;
  index: number;
  maker?: boolean;
}

interface ComponentState {
  code: string;
  solvingFor: string;
  answered: boolean;
  correct: boolean;
  inputVal: string;
  error?: string;
}

const fitDigits = (value: number | string): string => {
  const digits = value.toString();
  return digits.includes('.') ? digits.substring(0, 4) : digits.substring(0, 3);
};

const CodeRead = ({
  questionData,
  offsetFromMiddle,
  maker = false,
}: CodeReadProps): React.ReactElement => {
  const { content, solveFor, complexity, tagsUsed, answerLength, answerType } = questionData;
  const [store, setStore] = useContext(Context);
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useState<ComponentState>({
    code: fillItAndPrettify(content, maker),
    solvingFor: fillItAndPrettify(solveFor, true),
    answered: false,
    correct: false,
    inputVal: '',
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      code: fillItAndPrettify(content, maker),
      solvingFor: fillItAndPrettify(solveFor, true),
    }));
  }, [content, maker, solveFor]);

  const isPseudo = useMemo(() => {
    if (typeof id !== 'string') {
      return false;
    }
    return id.includes('pseudo');
  }, [id]);

  const gotIt = () => {
    setState({
      code: fillItAndPrettify(content, maker),
      solvingFor: fillItAndPrettify(solveFor, true),
      answered: false,
      correct: false,
      inputVal: '',
      error: undefined,
    });
  };

  const updateStats = (correct: boolean) => {
    const now = Date.now();
    const updatedReadStats: ReadStat[] = [
      ...store.readStats,
      { correct, complexity, time: now },
    ];

    const deltas = updatedReadStats
      .map((item, index) => (index > 0 ? item.time - updatedReadStats[index - 1].time : 0))
      .filter((delta) => delta > 0);
    const averageDelta = deltas.length
      ? deltas.reduce((acc, delta) => acc + delta, 0) / deltas.length
      : 1000;
    const rpm = Number.isFinite(averageDelta) ? (60 / (averageDelta / 1000)).toFixed(2) : '1.0';

    const totalComplexity = updatedReadStats.reduce(
      (sum, item) => sum + (item.complexity ?? 0),
      0,
    );
    const avgComplexity =
      updatedReadStats.length > 0 ? (totalComplexity / updatedReadStats.length).toFixed(2) : '0';

    const nextSlides = [...store.slides];
    const currentSlide = nextSlides[store.currentIndex];
    if (currentSlide && currentSlide.type === 'read') {
      nextSlides[store.currentIndex] = { ...currentSlide, done: true };
    }

    const score = fitDigits(Number(fitDigits(rpm)) * Number(fitDigits(avgComplexity)));

    setStore((prev) => ({
      ...prev,
      slides: nextSlides,
      readStats: updatedReadStats,
      confettiKey: Date.now(),
      avgComplexity: fitDigits(avgComplexity),
      rpm: fitDigits(rpm),
      score,
    }));

    if (store.raceID && store.raceWorkout === store.workout) {
      socket.emit('newResult', store.raceID, store.userName ?? '', {
        name: store.userName ?? '',
        score,
        progress: (
          ((store.currentIndex + 1) / Math.max(store.slides.length - 1, 1)) *
          100
        ).toFixed(0),
      });
    }

    window.setTimeout(() => {
      setStore((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        avgComplexity: fitDigits(avgComplexity),
        rpm: fitDigits(rpm),
        score,
      }));
    }, 1500);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    solvingExpression: string,
  ) => {
    if (event.key !== 'Enter') {
      return;
    }

    if (state.answered) {
      return;
    }

    const expected = evalCode(state.code, solvingExpression, isPseudo).toLowerCase();
    const actual = event.currentTarget.value.toLowerCase().trim();

    if (expected === actual) {
      setState((prev) => ({
        ...prev,
        answered: true,
        correct: true,
      }));
      updateStats(true);
      window.setTimeout(() => {
        setState((prev) => ({
          ...prev,
          answered: false,
          correct: false,
          inputVal: '',
        }));
      }, 1500);
    } else {
      setState((prev) => ({
        ...prev,
        answered: true,
        correct: false,
      }));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      inputVal: event.target.value,
    }));
  };

  const shownCode = isPseudo ? jsToPseudoCode(state.code) : state.code;
  const shownSolvingFor = isPseudo
    ? jsToPseudoCode(state.solvingFor)
    : state.solvingFor;

  return (
    <CodeReadContainer>
      <Editor
        value={shownCode}
        highlight={() => CodeHighlight(shownCode, store.theme)}
        onValueChange={() => undefined}
        padding={10}
        style={{
          fontSize: 18,
          width: '100%',
          maxWidth: '1200px',
          border: '1px solid #555',
          boxSizing: 'border-box',
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          ...store.theme.plain,
        }}
      />

      <BottomContainer>
        {offsetFromMiddle === 0 ? (
          <div>
            <SolvingFor>
              {shownSolvingFor.replace(';', '')} {isPseudo ? '=' : '=='}
            </SolvingFor>
            <InputBox
              value={state.inputVal}
              wide={answerLength > 10}
              autoFocus={!maker}
              onChange={handleInputChange}
              onKeyDown={(event) => handleKeyDown(event, state.solvingFor)}
              type={answerType}
            />
            {store.currentIndex === 0 && !maker ? (
              <Attention message="enter your response" />
            ) : null}
          </div>
        ) : null}
        <Feedback
          answered={state.answered}
          correct={state.correct}
          error={state.error}
          gotIt={gotIt}
          code={state.code}
          solveFor={state.solvingFor}
          isPseudo={isPseudo}
        />
      </BottomContainer>
      {complexity ? (
        <CodeReadInfo tagsUsed={tagsUsed} complexity={complexity} maker={maker} pseudo={isPseudo} />
      ) : null}
    </CodeReadContainer>
  );
};

export default CodeRead;
