import React, { useContext, useEffect, useRef, useState } from 'react';

import Button from './Button';
import { Context } from './AppContext';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io();

const InputBox = styled.input`
   bottom: 25px;
   width: ${(props) => (props.w ? `200px` : `60px`)};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border-color: ${(props) => props.theme.plain.color + '66'};
   border-radius: 2px;
   filter: brightness(130%);
   color: ${(props) => props.theme.plain.color};
   height: 30px;
   text-align: center;
`;

const JoinRace = ({}) => {
   const [store, setStore] = useContext(Context);
   const [state, setState] = useState({});
   useEffect(() => {}, []);
   const nameInput = useRef();
   const handleJoin = () => {
      setStore({ ...store, userName: nameInput.current.value });
      const youUser = {
         name: nameInput.current.value,
         score: 0,
         progress: 0,
      };
      socket.emit('newResult', youUser);
      let temp = results;
      temp[nameInput.current.value] = youUser;
      setResults(temp);
   };

   return (
      <div>
         <InputBox type='text' ref={nameInput}></InputBox>
         <Button onClick={() => handleJoin()}>Join</Button>
      </div>
   );
};
export default JoinRace;
