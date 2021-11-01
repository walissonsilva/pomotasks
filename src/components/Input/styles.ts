import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  padding: 6px;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const InputElement = styled.input`
  padding: 6px 1rem;
  height: 2.6rem;
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors["background-secondary"]};
  color: ${(props) => props.theme.colors["text-color"]};

  &::placeholder {
    font-weight: 300;
  }
`;
