import React from "react";

import { Container } from "./styles";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "danger";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  color = "primary",
  onClick,
  disabled,
  children,
}) => {
  return (
    <Container size={size} onClick={onClick} disabled={disabled} color={color}>
      {children}
    </Container>
  );
};
