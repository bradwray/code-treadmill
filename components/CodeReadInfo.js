import styled from "styled-components";
import React, { useContext } from "react";

const InfoBar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  font-size: 20px;
  font-family: "Dank Mono", "Fira Code", monospace;
  color: ${(props) => props.theme.plain.color + "66"};
  display: flex;
  justify-content: space-between;
`;

const Tag = styled.a`
  border: 1px solid ${(props) => props.theme.plain.color + "99"};
  border-radius: 3px;
  background: ${(props) => props.theme.plain.backgroundColor};
  color: ${(props) => props.theme.plain.color + "66"};
  font-size: 20px;
  font-family: "Dank Mono", "Fira Code", monospace;
  text-decoration: none;
  padding: 3px;
  margin: 10px;
  :hover {
    background-color: ${(props) => props.theme.plain.color};
    color: ${(props) => props.theme.plain.backgroundColor};
  }
`;

function CodeReadInfo({ tagsUsed, difficulty }) {
  return (
    <InfoBar>
      <div>
        What is...{" "}
        {tagsUsed.map(({ tag, path }) => (
          <Tag
            target="_blank"
            href={
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/" +
              path
            }
          >
            {tag}
          </Tag>
        ))}
      </div>
      <div>Difficulty: {difficulty}</div>
    </InfoBar>
  );
}

export default CodeReadInfo;
