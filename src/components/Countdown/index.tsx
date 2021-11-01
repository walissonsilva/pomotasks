import * as ReactCountdown from "react-countdown";

import { Container, ValueContainer, Value, Label } from "./styles";

type CountdownProps = {
  onComplete: () => void;
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

export const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  return (
    <>
      <ReactCountdown.default
        className=""
        zeroPadTime={2}
        autoStart
        date={Date.now() + 10000}
        renderer={(props) => CountdownTemplate(props)}
        intervalDelay={0}
        onComplete={onComplete}
      />
    </>
  );
};
