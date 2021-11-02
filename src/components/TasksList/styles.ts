import styled from "styled-components";

export const Container = styled.section`
  margin-top: 3rem;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 1rem;
  }
`;

export const Title = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Summary = styled.div`
  display: flex;
  align-items: center;
  height: 1rem;

  @media (max-width: 500px) {
    padding-left: 0.5rem;
  }
`;

export const ScoreSummary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & + * {
    margin-left: 1rem;
  }
`;

export const ScoreFeeling = styled.p`
  margin-right: 0.4rem;
  font-size: 1.2rem;
  line-height: 1.2rem;
`;

export const ScoreTotal = styled.p`
  color: ${(props) => props.theme.colors.alpha};
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

export const List = styled.div``;

export const Task = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.alpha + "22"};
`;

export const Score = styled.p`
  width: 4rem;
  font-size: 2.4rem;
`;

export const Description = styled.p`
  flex: 1;
`;

export const Time = styled.div`
  font-size: 0.9rem;
  padding: 0 1rem;
`;

export const Start = styled.p`
  color: ${(props) => props.theme.colors.alpha};
  font-family: "Fira Code", monospace;
  margin-bottom: 0.3rem;
`;

export const End = styled.p`
  color: ${(props) => props.theme.colors.alpha};
  font-family: "Fira Code", monospace;
`;
