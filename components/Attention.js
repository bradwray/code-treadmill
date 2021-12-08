import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

const Point = styled.div`
  display: inline-block;
  width: 0;
  height: 0;
  transform: translateY(5px);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid ${(props) => props.theme.plain.color};
`;

const Tail = styled.div`
  display: inline-block;
  background-color: ${(props) => props.theme.plain.color};
  width: 30px;
  height: 10px;
`;

const MessageBox = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.plain.backgroundColor};
  background-color: ${(props) => props.theme.plain.color};
  text-align: center;
  transform: translateY(10px);
  padding: 2px;
  font-size: 16px;
  font-family: "Dank Mono", "Fira Code", monospace;
  width: 100px;
`;

const bounce = keyframes`
   0% {
      transform: translateX(0px);
   }
   50% {
      transform: translateX(15px);
   }
   100% {
      transform: translateX(0px);
   }
`;

const Wrapper = styled.div`
  display: inline-block;

  margin-left: 20px;
  animation-name: ${bounce};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const Attention = ({ message }) => {
  return (
    <Wrapper>
      <Point />
      <Tail />
      <MessageBox>{message}</MessageBox>
    </Wrapper>
  );
};

export default Attention;
