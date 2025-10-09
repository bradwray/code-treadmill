import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from './AppContext';
import makeDimmer from '../utils/makeDimmer';

import type { WorkoutSlideRead } from '../types';

const DisplayContainer = styled.div`
  width: 380px;
  height: 124px;
  border: 1px solid #666;
  border-radius: 10px;
  color: ${(props) => props.theme.styles[5].style.color};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  padding-top: 8px;
  box-shadow: inset 0px 0px 2px 0px white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  @media (max-width: 768px) {
    transform: scale(0.45) translateX(-115px) translateY(-30px) rotate(90deg);
  }
`;

const Display = styled.span<{ light: boolean }>`
  font-family: 'Orbitron', sans-serif;
  ${(props) =>
    props.light
      ? `box-shadow: inset 0px 0px 30px 0px #eee;`
      : `box-shadow: inset 0px 0px 30px 0px black;`};

  width: 320px;
  height: 70px;
  color: ${(props) => props.theme.styles[2].style.color};
  background-color: ${(props) =>
    props.light ? 'white' : makeDimmer(props.theme.styles[2].style.color, 0.1)};
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  transform: translateY(9px);
`;

const Bar = styled.div<{ height: number; width: number; done?: boolean }>`
  height: ${(props) => props.height}%;
  width: ${(props) => props.width}px;
  margin-right: 1px;
  background-color: ${(props) =>
    props.done ? props.theme.styles[2].style.color : null};
  border: 1px solid ${(props) => props.theme.styles[2].style.color};
  color: ${(props) => props.theme.plain.backgroundColor};
  box-shadow: 0px 0px 20px 0px ${(props) => props.theme.styles[2].style.color + '44'};
  font-size: 6px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  :hover {
    background-color: ${(props) => props.theme.plain.color};
    color: ${(props) => props.theme.plain.backgroundColor};
    font-size: 12px;
    transform: scale(1.2);
  }
`;

const Label = styled.span<{
  fontSize?: number;
  bumpY: number;
  bumpX?: number;
  rotate?: number;
}>`
  position: absolute;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  background: ${(props) => props.theme.plain.backgroundColor};
  color: ${(props) => props.theme.plain.color};
  z-index: 2000;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 25)}px;
  transform: translateY(${(props) => props.bumpY}px)
    translateX(${(props) => (props.bumpX ? props.bumpX : 0)}px)
    rotate(${(props) => (props.rotate ? props.rotate : 0)}deg);
`;

const Line = styled.hr<{ bump: number }>`
  width: 377px;
  z-index: 0;
  transform: translateY(${(props) => props.bump}px);
  height: 3px;
  border: 0;
  background-color: ${(props) => props.theme.plain.color}; ;
`;

const scale = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  if (inMax === inMin) {
    return outMin;
  }
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export default function ProgressChart(): React.ReactElement {
  const [store] = useContext(Context);
  const { slides } = store;

  const readSlides = slides.filter(
    (slide): slide is WorkoutSlideRead => slide.type === 'read',
  );

  const complexities = readSlides.map(({ complexity }) => complexity);
  const maxComplexity = complexities.length > 0 ? Math.max(...complexities) : 0;

  return (
    <div>
      <DisplayContainer>
        <div style={{ position: 'absolute' }}>
          <Label bumpY={-59} bumpX={8}>
            Progress
          </Label>
          <Line bump={-55} />
        </div>
        <Label bumpY={10} bumpX={-180} rotate={270} fontSize={10}>
          Complexity
        </Label>
        <Display light={store.themeType === 'light'}>
          {readSlides.map(({ complexity, done }, index) => (
            <Bar
              key={`${index}-${complexity}`}
              done={done}
              height={scale(complexity, 0, maxComplexity || 1, 0, 90)}
              width={readSlides.length > 1 ? 300 / (readSlides.length - 1) : 300}
            />
          ))}
        </Display>
      </DisplayContainer>
    </div>
  );
}
