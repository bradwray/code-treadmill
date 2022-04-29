import React, { useContext, useEffect, useState } from 'react';

import { Context } from './AppContext';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import workouts from '../workouts/workoutsOptions';

const ListItem = styled.div`

   list-style: none;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   border-radius: 3px;
   background-color: ${(props) => props.theme.plain.color};
      color: ${(props) => props.theme.plain.backgroundColor};
   font-size: 16px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   text-decoration: none;
   padding: 4px;
   margin: 10px;
   margin-right: 5px;
   margin-left: 35px;
   text-align: center;
   max-width: 150px;
   cursor: pointer;
   :hover {
      background: ${(props) => props.theme.plain.backgroundColor};
      color: ${(props) => props.theme.plain.color};
      }
   }
`;

const WorkoutsMenu = ({ end }) => {
   const [store, setStore] = useContext(Context);
   const router = useRouter();
   let { id } = router.query;
   id = id ? id : '';
   const handleClick = (workout) => {
      setStore({
         ...store,
         currentIndex: 0,
         readStats: [],
         raceStats: [],
         rpm: 0,
         avgComplexity: 0,
      });
      router.push('/' + workout);
   };
   return (
      <div>
         {end ? (
            <div>
               <div>Great work! </div>{' '}
               <div>
                  Now try one of these other {id.includes('pseudo') ? 'PseudoCode' : ''} workouts
               </div>
            </div>
         ) : (
            <div>
               <div>Try out one of these coding workouts</div>
            </div>
         )}

         {id.includes('pseudo')
            ? workouts
                 .filter(({ lang }) => lang.includes('pseudo'))
                 .map(({ workout }, key) => (
                    <ListItem key={key} onClick={() => handleClick(workout)}>
                       <a href={'/pseudo-' + workout} styled={{ color: 'white' }}>
                          {workout}
                       </a>
                    </ListItem>
                 ))
            : workouts.map(({ workout }, key) => (
                 <ListItem key={key} onClick={() => handleClick(workout)}>
                    <a href={'/js-' + workout} styled={{ color: 'white' }}>
                       {workout}
                    </a>
                 </ListItem>
              ))}
      </div>
   );
};

export default WorkoutsMenu;
