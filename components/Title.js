import styled from "styled-components";
const Title = styled.div`
  transform: translateY(-54px) translateX(-50px) rotate(-5deg);
  width: 180px;
  animation-name: spin;
  animation-iteration-count: 3;
  animation-duration: 0.1s;
  @keyframes spin {
    0% {
      transform: translateY(-54px) translateX(-50px) rotate(0deg);
    }
    100% {
      transform: translateY(-54px) translateX(-50px) rotate(-360deg);
    }
  }
`;

export default Title;
