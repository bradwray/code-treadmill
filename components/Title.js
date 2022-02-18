import styled from 'styled-components';
const Title = styled.div`
   transform-origin: center;
   text-align: center;
   transform: translateY(-50px) translateX(${(props) => props.xOffset}) rotate(-5deg);
   width: ${(props) => props.w};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border: 1px solid ${(props) => props.theme.plain.color + '66'};
   border-radius: 2px;
   color: ${(props) => props.theme.plain.color};
   animation-name: spin;
   animation-iteration-count: 3;
   animation-duration: 0.1s;
   @keyframes spin {
      0% {
         transform: translateY(-54px) translateX(${(props) => props.xOffset}) rotate(0deg);
      }
      100% {
         transform: translateY(-54px) translateX(${(props) => props.xOffset}) rotate(-360deg);
      }
   }
`;

export default Title;
