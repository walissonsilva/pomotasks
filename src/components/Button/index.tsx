import React from "react";

import { Container } from "./styles";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  onClick,
  disabled,
  children,
}) => {
  return (
    <Container size={size} onClick={onClick} disabled={disabled}>
      {children}
    </Container>
  );
};
