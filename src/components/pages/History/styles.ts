import styled from "styled-components";

export const Container = styled.section``;

export const PageTitle = styled.h1`
  font-weight: 500;
  font-size: 1.8rem;
`;

export const PomotasksListContainer = styled.div`
  & + * {
    margin-top: 2rem;
  }
`;
