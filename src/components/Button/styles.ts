import styled, { css } from "styled-components";

interface ButtonProps {
  size: "sm" | "md" | "lg";
  color: "primary" | "success" | "danger";
  disabled?: boolean;
}

export const Container = styled.button<ButtonProps>`
  display: block;
  border-radius: 7px;
  padding: 0.4rem 1rem;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => `linear-gradient(to right,
    ${props.theme.colors["primary-color"]}, ${props.theme.colors["secondary-color"]})`};
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s, filter 0.3s;

  ${(props) =>
    props.color === "success" &&
    css`
      background: ${(props) => props.theme.colors.success};
    `}
  ${(props) =>
    props.color === "danger" &&
    css`
      background: ${(props) => props.theme.colors.danger};
    `}

  ${(props) =>
    props.size === "sm" &&
    css`
      font-size: 0.85rem;
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      font-size: 1rem;
    `}
  
  ${(props) =>
    props.size === "lg" &&
    css`
      font-size: 1.2rem;
    `}

  &:hover {
    box-shadow: none;
    filter: brightness(1.2);
    transition: box-shadow 0.3s, filter 0.3s;
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;
