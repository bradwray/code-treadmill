import React, { useContext } from "react";

import styled from "styled-components";

const InfoBar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  font-size: 16px;
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
  font-size: 16px;
  font-family: "Dank Mono", "Fira Code", monospace;
  text-decoration: none;
  padding: 3px;
  margin: 10px;
  margin-right: 5px;
  margin-left: 5px;
  :hover {
    background-color: ${(props) => props.theme.plain.color};
    color: ${(props) => props.theme.plain.backgroundColor};
  }
`;

function CodeReadInfo({ tagsUsed, complexity }) {
  return (
    <InfoBar>
      <div>
        {tagsUsed.map(({ tag, path }, i) => {
          let trimTag = tag.trim();
          if (trimTag == "{") trimTag += " }";
          if (trimTag == "(") trimTag += " )";
          return (
            <Tag
              key={i}
              target="_blank"
              href={
                "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/" +
                path
              }
            >
              {trimTag}
            </Tag>
          );
        })}
      </div>
      <div>complexity {complexity}</div>
    </InfoBar>
  );
}

export default CodeReadInfo;
