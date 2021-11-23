import CodeRead from "./CodeRead.js";
import { Context } from "./AppContext";
import React from "react";
import { Spring } from "react-spring/";
import styled from "styled-components";

const SlideContainer = styled.div`
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
  position: absolute;
  height: 70vh;
  width: 90vw;
  color: ${(props) => props.theme.styles[5].style.color};
  background: ${(props) => props.theme.plain.backgroundColor};
  max-width: 800px;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const SlideCard = styled.div`
  position: relative;
  max-width: 1400px;
  width: 90%;
  height: 100%;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;
  transform-origin: 30% 50%;
`;

const InputBox = styled.input`
  position: absolute;
  bottom: 25px;
  width: 100px;
  height: 30px;
  text-align: center;
`;

const FeedBack = styled.div`
  position: absolute;
  font-size: 20px;
  bottom: 70px;
  /* width: 60px; */
  height: 30px;
  text-align: center;
`;

function Slide({
  content,
  solveFor,
  difficulty,
  tagsUsed,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }
  console.log(offsetRadius);
  return (
    <Spring
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${
          offsetFromMiddle === 0
            ? 60
            : 60 + (offsetFromMiddle * 50) / offsetRadius
        }%`,
        opacity: distanceFactor * distanceFactor,
      }}
      config={animationConfig}
    >
      {(style) => (
        <SlideContainer
          style={{
            ...style,
            fontSize: 18,
            boxSizing: "border-box",
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
          }}
        >
          <SlideCard>
            <CodeRead
              solveFor={solveFor}
              content={content}
              tagsUsed={tagsUsed}
              difficulty={difficulty}
              moveSlide={moveSlide}
              offsetFromMiddle={offsetFromMiddle}
            />
          </SlideCard>
        </SlideContainer>
      )}
    </Spring>
  );
}

export default Slide;