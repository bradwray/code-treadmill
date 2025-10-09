import React, { useContext } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Context } from './AppContext';
import workoutOptions from '../workouts/workoutsOptions';

import type { WorkoutOption } from '../workouts/workoutsOptions';

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

interface WorkoutDropdownProps {
  isRace?: boolean;
  setRaceWorkout?: (workoutId: string) => void;
}

function WorkoutDropdown({
  isRace = false,
  setRaceWorkout,
}: WorkoutDropdownProps): React.ReactElement {
  const [, setStore] = useContext(Context);

  const router = useRouter();
  const { id } = router.query;
  const selectedWorkout = typeof id === 'string' ? id : undefined;

  const handleChange = async (value: string) => {
    if (isRace) {
      setRaceWorkout?.(value);
    } else {
      await router.push(`/${value}`);
      setStore((prev) => ({
        ...prev,
        currentIndex: 0,
        readStats: [],
        raceStats: [],
        rpm: 0,
        avgComplexity: 0,
      }));
    }
  };

  const renderOptions = (lang: WorkoutOption['lang']) =>
    workoutOptions
      .filter((option) => option.lang === lang)
      .map((option) => (
        <option key={`${option.lang}-${option.workout}`} value={`${option.lang}-${option.workout}`}>
          {option.workout}
        </option>
      ));

  return (
    <div>
      <Label>Workout</Label>

      <Select
        value={selectedWorkout ?? ''}
        autoFocus={false}
        onChange={(event) => handleChange(event.target.value)}
      >
        <optgroup label="JavaScript">{renderOptions('js')}</optgroup>
        <optgroup label="PseudoCode">{renderOptions('pseudo')}</optgroup>
      </Select>
    </div>
  );
}

export default WorkoutDropdown;
