import React, { useContext } from "react";
import styled from "styled-components";

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
  width: 60px;
  height: 10px;
`;

const Attention = () => {
  return (
    <div>
      <Point />
      <Tail />
    </div>
  );
};

export default Attention;
