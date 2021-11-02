import styled, { css } from "styled-components";

export const AppCardContainer = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 3rem 3rem;
  background-color: ${(props) => props.theme.colors["background-primary"]};
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

type TabProps = {
  active: boolean;
};

export const Tab = styled.div<TabProps>`
  background-color: ${(props) => props.theme.colors["background-secondary"]};
  padding: 0.3rem 1rem;
  border-radius: 10px;
  min-width: 100px;
  text-align: center;
  cursor: pointer;

  ${(props) =>
    !props.active &&
    css`
      opacity: 0.5;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.75;
        transition: opacity 0.2s;
      }
    `}

  & + div {
    margin-left: 1rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
`;

export const TabLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors["alpha"]};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors["text-color"]};
`;

export const Version = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors["text-color"] + "55"};
`;
