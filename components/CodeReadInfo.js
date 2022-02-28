import React, { useContext } from 'react';

import { Context } from './AppContext';
import styled from 'styled-components';

const InfoBar = styled.div`
   width: ${(props) => (props.maker ? '100%' : '100%')};

   max-width: 750px;
   position: ${(props) => (props.maker ? 'relative' : 'absolute')};
   transform: ${(props) => (props.maker ? 'translateY(40px)' : 'null')};
   border: ${(props) => (props.maker ? '1px solid ' + props.theme.plain.color + '66' : 'null')};
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
   margin: 4px;
   margin-right: 5px;
   margin-left: 5px;
   :hover {
      background-color: ${(props) => props.theme.plain.color};
      color: ${(props) => props.theme.plain.backgroundColor};
      ${TooltipBox} {
         visibility: visible;
         background-color: ${(props) => props.theme.plain.color};
         color: ${(props) => props.theme.plain.backgroundColor};
         text-align: center;
         width: 200px;
         padding: 8px 8px;
         border-radius: 4px;
         transform: translateY(-42px) translateX(-30px);
      }
   }
`;

function CodeReadInfo({ tagsUsed, complexity, maker }) {
   const [store, setStore] = useContext(Context);
   return (
      <InfoBar maker={maker}>
         <div>
            {tagsUsed
               ? tagsUsed.map(({ tag, path }, i) => {
                    let trimTag = tag.trim();
                    if (trimTag == '{') trimTag += '}';
                    if (trimTag == '[') trimTag += ']';
                    if (trimTag.substring(trimTag.length - 1) == '(') trimTag += ')';
                    return (
                       <Tag
                          key={i}
                          target='_blank'
                          href={
                             'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/' +
                             path
                          }>
                          {trimTag}
                          <TooltipBox>
                             How does{' '}
                             <b
                                style={{
                                   color: store.theme.styles[6].style.color,
                                   fontSize: '18px',
                                }}>
                                {trimTag}
                             </b>{' '}
                             work?
                          </TooltipBox>
                       </Tag>
                    );
                 })
               : null}
         </div>
         <div>complexity {complexity}</div>
      </InfoBar>
   );
}

export default CodeReadInfo;
