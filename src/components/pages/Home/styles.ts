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
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-weight: 300;
  }

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
    font-size: 2.2rem;
    font-weight: 500;
    text-align: center;

    margin-bottom: 3rem;
  }

  h4 {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.alpha};
    margin: -2rem 0 3rem;
    font-weight: 400;
    text-align: center;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  margin: 2rem 0 1rem;
  width: 100%;

  button {
    min-width: 140px;
  }

  @media (max-width: 500px) {
    flex-direction: column;

    button {
      min-width: 100%;
    }
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
