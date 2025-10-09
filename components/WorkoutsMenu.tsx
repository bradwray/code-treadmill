import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Context } from './AppContext';
import workouts from '../workouts/workoutsOptions';

import type { WorkoutOption } from '../workouts/workoutsOptions';

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
  margin: 10px 5px 10px 35px;
  text-align: center;
  max-width: 150px;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.plain.backgroundColor};
    color: ${(props) => props.theme.plain.color};
  }
`;

interface WorkoutsMenuProps {
  end?: boolean;
}

const toRoute = (lang: WorkoutOption['lang'], workout: string) =>
  `${lang}-${workout}`;

const WorkoutsMenu = ({ end = false }: WorkoutsMenuProps): React.ReactElement => {
  const [, setStore] = useContext(Context);
  const router = useRouter();
  const { id } = router.query;
  const activeId = typeof id === 'string' ? id : '';

  const handleClick = async (workout: string) => {
    setStore((prev) => ({
      ...prev,
      currentIndex: 0,
      readStats: [],
      raceStats: [],
      rpm: 0,
      avgComplexity: 0,
    }));
    await router.push(`/${workout}`);
  };

  const renderItems = (filterLang: WorkoutOption['lang']) =>
    workouts
      .filter(({ lang }) => lang === filterLang)
      .map(({ workout }) => {
        const route = toRoute(filterLang, workout);
        return (
          <ListItem key={route} onClick={() => handleClick(route)}>
            {workout}
          </ListItem>
        );
      });

  const isPseudo = activeId.includes('pseudo');

  return (
    <div>
      {end ? (
        <div>
          <div>Great work! </div>
          <div>
            Now try one of these other {isPseudo ? 'PseudoCode' : ''} workouts
          </div>
        </div>
      ) : (
        <div>
          <div>Try out one of these coding workouts</div>
        </div>
      )}

      {isPseudo ? renderItems('pseudo') : renderItems('js')}
    </div>
  );
};

export default WorkoutsMenu;
