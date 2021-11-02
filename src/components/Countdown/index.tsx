import * as ReactCountdown from "react-countdown";
import { ITaskState } from "../pages/Home";
import { Container, Label, Value, ValueContainer } from "./styles";

type CountdownProps = {
  taskState: ITaskState;
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
  taskState,
  onComplete,
}) => {
  const timerDurationInMinutes =
    taskState === "IN_PROGRESS" ? 25 : taskState === "INTERRUPTION" ? 5 : 0;

  console.log(timerDurationInMinutes);

  function handleOnComplete() {
    if (taskState === "IN_PROGRESS" || taskState === "INTERRUPTION")
      return () => onComplete(false);
  }

  return (
    <>
      <ReactCountdown.default
        className=""
        key={Date.now()}
        zeroPadTime={2}
        autoStart
        date={Date.now() + timerDurationInMinutes * 1000 * 60}
        renderer={(props) => CountdownTemplate(props)}
        onComplete={handleOnComplete()}
      />
    </>
  );
};
