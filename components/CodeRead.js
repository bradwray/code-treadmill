import React, { useContext } from "react";

import jsToPseudoCode from "../utils/jsToPseudoCode";
import Attention from "./Attention";
import CodeHighlight from "./CodeHighlight";
import CodeReadInfo from "./CodeReadInfo";
import { Context } from "./AppContext";
import Editor from "react-simple-code-editor";
import Feedback from "./Feedback.js";
import evalCode from "../utils/evalCode";
import fillItAndPrettify from "../utils/fillItAndPrettify";
import io from "socket.io-client";
import styled from "styled-components";

const CodeReadContainer = styled.div`
  width: 100%;
  max-width: 1400px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 18;
  box-sizing: "border-box";
  font-family: '"Dank Mono", "Fira Code", monospace';
`;

const InputBox = styled.input`
  bottom: 25px;
  width: ${(props) => (props.w ? `200px` : `60px`)};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  border-color: ${(props) => props.theme.plain.color + "66"};
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
`;

const SolvingFor = styled.span`
  display: inline-block;
  font-size: 18px;
  font-family: "Dank Mono", "Fira Code", monospace;
  margin-right: 14px;
  margin-left: 5px;
  color: ${(props) => props.theme.plain.color};
`;

const socket = io();

function CodeRead({
  questionData: {
    content,
    solveFor,
    complexity,
    tagsUsed,
    answerLength,
    answerType,
  },
  offsetFromMiddle,
  index,
  maker,
}) {
  const [state, setState] = React.useState({
    code: fillItAndPrettify(content, maker),
    solvingFor: fillItAndPrettify(solveFor, true),
    answered: false,
    correct: false,
    inputVal: "",
  });
  React.useEffect(() => {
    setState({
      ...state,
      code: fillItAndPrettify(content, maker),
      solvingFor: fillItAndPrettify(solveFor, true),
    });
  }, [content, solveFor]);
  const [store, setStore] = useContext(Context);

  const gotIt = () => {
    setState({
      ...state,
      answered: false,
      correct: false,
      error: "",
      code: fillItAndPrettify(content, maker),
      solvingFor: fillItAndPrettify(solveFor, true),
      inputVal: "",
    });
  };

  const fitDigits = (num) => {
    const digits = num.toString();
    return digits.includes(".")
      ? digits.substring(0, 4)
      : digits.substring(0, 3);
  };

  const updateStats = (correct) => {
    let tempFlips = store.readStats;
    tempFlips[tempFlips.length] = { correct, complexity, time: Date.now() };
    if (correct) {
      let rpm =
        60 /
        (tempFlips
          .map((item, i) => {
            return i > 0 ? item.time - tempFlips[i - 1].time : 0;
          })
          .reduce((a, b) => a + b) /
          tempFlips.length /
          1000);
      rpm = Number.isFinite(rpm) ? rpm.toFixed(2) : 1.0;

      const avgComplexity =
        tempFlips
          .map((item) => item.complexity)
          .reduce((sum, value) => {
            return sum + value;
          }, 0) / tempFlips.length;
      const tempSlides = store.slides;
      tempSlides[store.currentIndex].done = true;
      //to make score equivalent to on screen calculation of rmp * complexity
      const score = fitDigits(fitDigits(rpm) * fitDigits(avgComplexity));
      setStore({
        ...store,
        slides: tempSlides,
        readStats: tempFlips,
        confettiKey: Date.now(),
        avgComplexity: fitDigits(avgComplexity),
        rpm: fitDigits(rpm),
        score,
      });
      socket.emit("newResult", {
        name: store.userName,
        score: score,
        progress: (
          ((store.currentIndex + 1) / store.slides.length) *
          100
        ).toFixed(0),
      });
      setTimeout(() => {
        setStore({
          ...store,
          currentIndex: store.currentIndex + 1,
          avgComplexity: fitDigits(avgComplexity),
          rpm: fitDigits(rpm),
          score,
        });
      }, 1500);
    }
  };

  const handleChange = (e, solvingFor) => {
    if (e.key === "Enter") {
      if (
        evalCode(state.code, solvingFor).toLowerCase() ===
          e.target.value.toLowerCase().trim() &&
        !state.answered
      ) {
        setTimeout(() => {
          setState({
            ...state,
            answered: false,
            correct: false,
            inputVal: "",
          });
        }, 1500);
        setState({
          ...state,
          answered: true,
          correct: true,
        });
        updateStats(true);
      } else {
        setState({
          ...state,
          answered: true,
          correct: false,
        });
        updateStats(false);
      }
    } else {
      setState({
        ...state,
        inputVal: e.target.value,
      });
    }
  };

  const { answered, correct, error, code, inputVal } = state;
  // console.log(jsToPseudoCode(code));
  return (
    <CodeReadContainer>
      <Editor
        value={code}
        highlight={() => CodeHighlight(code, store.theme)}
        onValueChange={() => {}}
        padding={10}
        style={{
          fontSize: 18,
          width: "100%",
          maxWidth: "1200px",
          border: "1px solid #555",
          boxSizing: "border-box",
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          ...store.theme.plain,
        }}
      />

      <BottomContainer>
        {offsetFromMiddle === 0 ? (
          <div>
            <SolvingFor>{state.solvingFor.replace(";", "")} ==</SolvingFor>
            <InputBox
              value={inputVal}
              w={answerLength > 10}
              autoFocus={!maker}
              onChange={(e) => handleChange(e, state.solvingFor)}
              onKeyDown={(e) => handleChange(e, state.solvingFor)}
              type={answerType}
            />
            {store.currentIndex == 0 && !maker ? (
              <Attention message="enter your response" />
            ) : null}
          </div>
        ) : null}{" "}
        <Feedback
          answered={answered}
          correct={correct}
          error={error}
          gotIt={gotIt}
          code={code}
          solveFor={state.solvingFor}
        />
      </BottomContainer>
      {complexity ? (
        <CodeReadInfo
          tagsUsed={tagsUsed}
          complexity={complexity}
          maker={maker}
        />
      ) : null}
    </CodeReadContainer>
  );
}

export default CodeRead;
