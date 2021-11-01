import { useMemo } from "react";
import * as ReactCountdown from "react-countdown";

import { Container, ValueContainer, Value, Label } from "./styles";

type CountdownProps = {
  isModalOpen: boolean;
  startDateTime?: string;
  onComplete: (triggerFromButton?: boolean) => void;
};

const CountdownTemplate = ({
  minutes,
  seconds,
}: ReactCountdown.CountdownRenderProps) => {
  return (
    <Container>
      <ValueContainer>
        <Value>{`${minutes}`.padStart(2, "0")}</Value>
        <Label>minutos</Label>
      </ValueContainer>
      <ValueContainer>
        <Value>{`${seconds}`.padStart(2, "0")}</Value>
        <Label>segundos</Label>
      </ValueContainer>
    </Container>
  );
};

export const Countdown: React.FC<CountdownProps> = ({
  isModalOpen,
  onComplete,
}) => {
  const endDateTime = useMemo(() => {
    return Date.now() + 3000;
  }, []);

  return (
    <>
      <ReactCountdown.default
        className=""
        zeroPadTime={2}
        autoStart
        date={endDateTime}
        renderer={(props) => CountdownTemplate(props)}
        onComplete={() => onComplete(false)}
      />
    </>
  );
};
