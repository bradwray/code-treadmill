import styled from 'styled-components';

const Button = styled.button`
   min-height: 45px;
   padding-right: 10px;
   padding-left: 10px;
   font-size: 22px;
   font-family: 'Dank Mono', 'Fira Code', monospace;
   border: 1px dashed ${(props) => props.theme.plain.backgroundColor + 'bb'};
   background-color: ${(props) => props.theme.plain.color};
   color: ${(props) => props.theme.plain.backgroundColor};
   :hover {
      transform: scale(1.05);
   }
`;

export default Button;
