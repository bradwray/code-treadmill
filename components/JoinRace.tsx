import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import Button from './Button';
import { Context } from './AppContext';

const InputBox = styled.input<{ wide?: boolean }>`
  bottom: 25px;
  width: ${(props) => (props.wide ? '200px' : '60px')};
  background-color: ${(props) => props.theme.plain.backgroundColor};
  border-color: ${(props) => props.theme.plain.color + '66'};
  border-radius: 2px;
  filter: brightness(130%);
  color: ${(props) => props.theme.plain.color};
  height: 30px;
  text-align: center;
`;

const JoinRace = (): React.ReactElement => {
  const [, setStore] = useContext(Context);
  const nameInput = useRef<HTMLInputElement | null>(null);

  const handleJoin = () => {
    const value = nameInput.current?.value?.trim();
    if (!value) {
      return;
    }

    setStore((prev) => ({ ...prev, userName: value }));
  };

  return (
    <div>
      <InputBox type="text" ref={nameInput} />
      <Button onClick={handleJoin}>Join</Button>
    </div>
  );
};

export default JoinRace;
