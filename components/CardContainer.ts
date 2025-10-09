import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid #ddd;
  background-color: ${(props) => props.theme.plain.backgroundColor};
  color: ${(props) => props.theme.plain.color};
  font-family: "Dank Mono", "Fira Code", monospace;
  margin-bottom: 20px;
  min-height: 600px;
  width: 90%;
  max-width: 1400px;
  font-size: 25px;
  top: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 40px;
`;

export default CardContainer;
