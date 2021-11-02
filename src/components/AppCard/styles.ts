import styled from "styled-components";

export const AppCardContainer = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background-color: ${(props) => props.theme.colors["background-primary"]};
  border-radius: 10px;
`;
