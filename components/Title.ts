import styled from 'styled-components';

interface TitleProps {
  big?: boolean;
  xOffset?: string;
  w?: string;
}

const Title = styled.div<TitleProps>`
   transform-origin: center;
   text-align: center;
   ${(props) => (props.big ? 'font-size: 40px;' : '')};
   transform: translateY(-50px)
      translateX(${(props) => (props.xOffset !== undefined ? props.xOffset : '0px')}) rotate(-5deg);
   width: ${(props) => (props.w !== undefined ? props.w : 'auto')};
   background-color: ${(props) => props.theme.plain.backgroundColor};
   border: 1px solid ${(props) => props.theme.plain.color + '66'};
   border-radius: 2px;
   color: ${(props) => props.theme.plain.color};
   animation-name: spin;
   animation-iteration-count: 3;
   animation-duration: 0.1s;
   @keyframes spin {
      0% {
         transform: translateY(-54px)
            translateX(${(props) => (props.xOffset !== undefined ? props.xOffset : '0px')})
            rotate(0deg);
      }
      100% {
         transform: translateY(-54px)
            translateX(${(props) => (props.xOffset !== undefined ? props.xOffset : '0px')})
            rotate(-360deg);
      }
   }
`;

export default Title;
