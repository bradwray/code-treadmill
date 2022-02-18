import styled from "styled-components";

const Link = styled.a`
  ${(props) =>
    props.ownLine
      ? `display: block;
      margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;`
      : ``}
  :link {
    color: ${(props) => props.theme.styles[2].style.color};
  }
  :visited {
    color: ${(props) => props.theme.styles[2].style.color};
  }
  :hover {
    color: ${(props) => props.theme.styles[6].style.color};
  }
  :active {
    color: ${(props) => props.theme.styles[2].style.color};
  }
`;

export default Link;
