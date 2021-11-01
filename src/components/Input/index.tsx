import { FormEvent } from "react";
import * as S from "./styles";

type InputProps = {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange: (evt: FormEvent<HTMLElement>) => void;
  readOnly?: boolean;
};

export const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  value,
  placeholder,
  onChange,
  readOnly,
}) => {
  return (
    <S.InputContainer>
      {label && <S.InputLabel>{label}</S.InputLabel>}
      <S.InputElement
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </S.InputContainer>
  );
};
