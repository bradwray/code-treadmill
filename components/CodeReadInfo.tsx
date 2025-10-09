import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from './AppContext';

import type { CodeTag } from '../types';

const InfoBar = styled.div<{ maker?: boolean }>`
  width: 100%;
  max-width: 750px;
  position: ${(props) => (props.maker ? 'relative' : 'absolute')};
  transform: ${(props) => (props.maker ? 'translateY(40px)' : 'none')};
  border: ${(props) => (props.maker ? `1px solid ${props.theme.plain.color}66` : 'none')};
  bottom: 10px;
  font-size: 16px;
  font-family: 'Dank Mono', 'Fira Code', monospace;
  color: ${(props) => props.theme.plain.color + '66'};
  display: flex;
  justify-content: space-between;
`;

const TooltipBox = styled.span`
  position: absolute;
  visibility: hidden;
`;

const Tag = styled.a`
  border: 1px solid ${(props) => props.theme.plain.color + '99'};
  border-radius: 3px;
  display: inline-block;
  background: ${(props) => props.theme.plain.backgroundColor};
  color: ${(props) => props.theme.plain.color + '66'};
  font-size: 16px;
  font-family: 'Dank Mono', 'Fira Code', monospace;
  text-decoration: none;
  padding: 3px;
  margin: 4px 5px;
  :hover {
    background-color: ${(props) => props.theme.plain.color};
    color: ${(props) => props.theme.plain.backgroundColor};
    ${TooltipBox} {
      visibility: visible;
      background-color: ${(props) => props.theme.plain.color};
      color: ${(props) => props.theme.plain.backgroundColor};
      text-align: center;
      width: 200px;
      padding: 8px;
      border-radius: 4px;
      transform: translateY(-42px) translateX(-30px);
    }
  }
`;

interface CodeReadInfoProps {
  tagsUsed?: CodeTag[];
  complexity?: number;
  maker?: boolean;
  pseudo?: boolean;
}

const CodeReadInfo = ({
  tagsUsed,
  complexity,
  maker,
  pseudo,
}: CodeReadInfoProps): React.ReactElement => {
  const [store] = useContext(Context);

  if (pseudo) {
    return (
      <InfoBar maker={maker}>
        <div>
          <Tag
            key="pseudo"
            target="_blank"
            rel="noopener noreferrer"
            href="https://apcentral.collegeboard.org/pdf/ap-computer-science-principles-exam-reference-sheet.pdf"
          >
            How does AP CSP PseudoCode work?
          </Tag>
        </div>
        <div>complexity {complexity}</div>
      </InfoBar>
    );
  }

  return (
    <InfoBar maker={maker}>
      <div>
        {tagsUsed?.map(({ tag, path }) => {
          let trimTag = tag.trim();
          if (trimTag === '{') trimTag += '}';
          if (trimTag === '[') trimTag += ']';
          if (trimTag.endsWith('(')) trimTag += ')';

          return (
            <Tag
              key={`${tag}-${path}`}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/${path}`}
            >
              {trimTag}
              <TooltipBox>
                How does{' '}
                <b
                  style={{
                  color: String(store.theme.styles[6]?.style.color ?? ''),
                    fontSize: '18px',
                  }}
                >
                  {trimTag}
                </b>{' '}
                work?
              </TooltipBox>
            </Tag>
          );
        })}
      </div>
      <div>complexity {complexity}</div>
    </InfoBar>
  );
};

export default CodeReadInfo;
