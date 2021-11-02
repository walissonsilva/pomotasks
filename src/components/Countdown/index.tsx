import { useEffect, useMemo, useState } from "react";
import * as ReactCountdown from "react-countdown";
import { ITaskState } from "../pages/Home";

import { Container, ValueContainer, Value, Label } from "./styles";

type CountdownProps = {
  isModalOpen: boolean;
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
  isModalOpen,
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
        date={Date.now() + timerDurationInMinutes * 1000}
        renderer={(props) => CountdownTemplate(props)}
        onComplete={handleOnComplete()}
      />
    </>
  );
};
