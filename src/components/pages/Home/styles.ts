import styled from "styled-components";

export const WelcomeMessageContainer = styled.div``;

export const HelloMessage = styled.h3`
  color: ${(props) => props.theme.colors.alpha};
  font-weight: 300;
`;

export const WelcomeMessage = styled.h1`
  font-weight: 500;
`;

export const InputTaskContainer = styled.form`
  width: 100%;
  margin-top: 1.6rem;

  display: flex;
  align-items: flex-end;
  gap: 1rem;

  button {
    margin-top: 1rem;
    height: 2.6rem;
  }
`;

export const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 2rem;
    font-weight: 500;

    margin-bottom: 3rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  margin-top: 2rem;

  button {
    min-width: 140px;
  }
`;

export const ModalContentContainer = styled.div`
  padding: 2rem;

  h3 {
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 1.6rem;
  }
`;

export const EmojiScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EmojiScore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors["background-secondary"]};
  }

  & > span:first-child {
    font-size: 4rem;
  }

  & > span:last-child {
    font-size: 1rem;
  }
`;
