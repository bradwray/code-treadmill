import React, { useContext } from 'react';

import { Context } from './AppContext';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import workoutOptions from '../workouts/workoutsOptions';

const Select = styled.select`
   width: 130px;
   height: 40px;
   padding-left: 5px;
   font-family: 'Orbitron', sans-serif;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   color: ${(props) => props.theme.plain.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   margin: 10px;
`;

const Label = styled.span`
   position: absolute;
   text-align: center;
   font-family: 'Orbitron', sans-serif;
   color: ${(props) => props.theme.plain.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   z-index: 2000;
   font-size: 10px;
   transform: translateY(4px) translateX(15px);
`;

function WorkoutDropdown({ isRace, setRaceWorkout }) {
   const [store, setStore] = useContext(Context);

   const router = useRouter();
   const { id } = router.query;

   const handleChange = (val) => {
      if (isRace) {
         setRaceWorkout(val);
      } else {
         router.push('/' + val);
         setStore({
            ...store,
            currentIndex: 0,
            readStats: [],
            raceStats: [],
            rpm: 0,
            avgComplexity: 0,
         });
      }
   };

   return (
      <div>
         <Label>Workout</Label>

         <Select value={id} autoFocus={false} onChange={(e) => handleChange(e.target.value)}>
            <optgroup label='JavaScript'>
               {workoutOptions.map(({ lang, workout }, i) => {
                  if (lang === 'js') {
                     return (
                        <option key={i} value={lang + '-' + workout}>
                           {workout}
                        </option>
                     );
                  }
               })}
            </optgroup>
            <optgroup label='PseudoCode'>
               {workoutOptions.map(({ lang, workout }, i) => {
                  if (lang === 'pseudo') {
                     return (
                        <option key={i} value={lang + '-' + workout}>
                           {workout}
                        </option>
                     );
                  }
               })}
            </optgroup>
         </Select>
      </div>
   );
}

export default WorkoutDropdown;
