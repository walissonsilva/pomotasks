import * as ReactCountdown from "react-countdown";

import { Container, ValueContainer, Value, Label } from "./styles";

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

export const Countdown: React.FC = () => {
  return (
    <>
      <ReactCountdown.default
        className=""
        zeroPadTime={2}
        autoStart
        date={Date.now() + 1500000}
        renderer={(props) => CountdownTemplate(props)}
        intervalDelay={0}
      />
    </>
  );
};
