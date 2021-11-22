import React, { useContext } from "react";

import CodeHighlight from "./CodeHighlight";
import { Context } from "./AppContext";
import Editor from "react-simple-code-editor";
import Feedback from "./Feedback.js";
import fillIt from "../codeUtils/fillIt";
import styled from "styled-components";
import CodeReadInfo from "./CodeReadInfo";

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
  width: 200px;
  color: ${(props) => props.theme.plain.color};
  background: ${(props) => props.theme.plain.backgroundColor};
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

function CodeRead({
  content,
  solveFor,
  difficulty,
  tagsUsed,
  moveSlide,
  offsetFromMiddle,
}) {
  const [state, setState] = React.useState({
    code: null,
    answered: false,
    correct: false,
    inputVal: "",
  });

  const [store, setStore] = useContext(Context);

  React.useEffect(() => {
    setState({
      ...state,
      code: fillIt(content),
    });
  }, [content]);

  const gotIt = () => {
    setState({
      ...state,
      answered: false,
      correct: false,
      error: "",
      code: fillIt(content),
      inputVal: "",
    });
  };

  const evalCode = (code) => {
    var wholeEval = new Function(code + "\n" + "return " + solveFor);

    try {
      return wholeEval().toString();
    } catch (error) {
      console.log(error.toString());
      setState({ ...state, error: error.toString() });
      return error.toString();
    }
  };

  const updateStats = (correct) => {
    let tempFlips = store.readStats;
    tempFlips[tempFlips.length] = { correct, time: Date.now() };
    let spf =
      tempFlips
        .map((item, i) => {
          return i > 0 ? item.time - tempFlips[i - 1].time : 0;
        })
        .reduce((a, b) => a + b) /
      tempFlips.length /
      1000;
    let rpm = 60 / spf;
    rpm = Number.isFinite(rpm) ? rpm.toFixed(2) : 1.0;

    rpm = rpm.toString().length > 3 ? Number(rpm).toFixed(1) : rpm;
    setStore({
      ...store,
      readStats: tempFlips,
      rpm: rpm,
    });
  };

  const handleChange = (e) => {
    if (e.key === "Enter") {
      if (
        evalCode(state.code).toLowerCase() ===
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
          moveSlide();
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
  //   console.log(offsetFromMiddle);
  const { answered, correct, error, code, inputVal } = state;
  const theCode = code ? code : content;

  return (
    <CodeReadContainer>
      <CodeReadInfo tagsUsed={tagsUsed} difficulty={difficulty} />
      <Editor
        value={theCode}
        highlight={() => CodeHighlight(theCode, store.theme)}
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
            <SolvingFor>{solveFor} ===</SolvingFor>
            <InputBox
              value={inputVal}
              autoFocus
              onChange={handleChange}
              onKeyDown={handleChange}
            />
          </div>
        ) : null}
        <Feedback
          answered={answered}
          correct={correct}
          error={error}
          gotIt={gotIt}
          answer={() => evalCode(code)}
        />
      </BottomContainer>
    </CodeReadContainer>
  );
}

export default CodeRead;
