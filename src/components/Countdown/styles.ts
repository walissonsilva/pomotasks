import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  min-width: 120px;
  background-color: ${(props) => props.theme.colors["background-secondary"]};
  border-radius: 7px;
  padding: 0rem 2rem 1rem;

  & + div {
    margin-left: 1rem;
  }
`;

export const Value = styled.span`
  font-size: 5rem;
  font-family: "Fira Code", monospace;

  @media (max-width: 500px) {
    font-size: 4rem;
  }
`;

export const Label = styled.span`
  font-size: 1.1rem;
  font-family: "Fira Code", monospace;
`;
