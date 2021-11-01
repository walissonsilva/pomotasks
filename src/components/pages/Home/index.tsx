import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import AppCard from "../../AppCard";
import { Button } from "../../Button";
import { Countdown } from "../../Countdown";
import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { useModal } from "../../Modal/useModal";

import { emojisScore, IEmojiScore } from "../../../data/emojisScore";

import * as S from "./styles";

type taskState = "IDLE" | "IN_PROGRESS" | "FINISHED";

type ITask = {
  title: string;
  startTime: string;
  endTime: string;
  score: IEmojiScore;
};

export const HomeComponentPage: React.FC = () => {
  const [task, setTask] = useState<ITask>({} as ITask);
  const [taskState, setTaskState] = useState<taskState>("IDLE");
  const { isOpen: isModalOpen, openModal, toggleModal } = useModal();

  function handleInitPomodoro(evt: FormEvent) {
    evt.preventDefault();

    if (Object.keys(task).length && task.title) {
      setTaskState("IN_PROGRESS");
      setTask({
        ...task,
        startTime: new Date().toLocaleString(),
      });
    } else {
      toast.error("Defina o nome da tarefa");
    }
  }

  function handleGiveUpPomodoro() {
    setTaskState("IDLE");
    setTask({} as ITask);
  }

  function handleFinishPomodoro(triggerFromButton?: boolean) {
    console.log(triggerFromButton);
    if (!triggerFromButton) {
      const audio = new Audio("/sounds/beep-short.mp3");
      audio.play();
    }

    openModal();
  }

  function savePomodoroInfo(score: IEmojiScore) {
    const tasks = localStorage.getItem("@pomotasks/tasks");

    const endTask: ITask = {
      ...task,
      endTime: new Date().toLocaleString(),
      score: score,
    };

    if (tasks) {
      localStorage.setItem(
        "@pomotasks/tasks",
        JSON.stringify([...JSON.parse(tasks), endTask])
      );
    } else {
      localStorage.setItem("@pomotasks/tasks", JSON.stringify([endTask]));
    }

    setTask({} as ITask);
    setTaskState("IDLE");
  }

  return (
    <AppCard>
      {taskState === "IDLE" ? (
        <>
          <S.WelcomeMessageContainer>
            <S.HelloMessage>Olá, Walisson!</S.HelloMessage>
            <S.WelcomeMessage>Bem-vinda(o) ao PomoTasks!</S.WelcomeMessage>
          </S.WelcomeMessageContainer>

          <S.InputTaskContainer onSubmit={handleInitPomodoro}>
            <Input
              label="Próxima Tarefa"
              placeholder="Informe sua tarefa..."
              value={task.title}
              onChange={(evt: FormEvent<HTMLInputElement>) => {
                setTask({
                  ...task,
                  title: evt.currentTarget.value,
                });
              }}
              readOnly={taskState !== "IDLE"}
            />
          </S.InputTaskContainer>
        </>
      ) : (
        <S.CountdownContainer>
          <h2>{task.title}</h2>

          <Countdown
            isModalOpen={isModalOpen}
            onComplete={handleFinishPomodoro}
          />

          <S.ButtonsContainer>
            <Button onClick={handleGiveUpPomodoro} color="danger">
              Abandonar
            </Button>
            <Button onClick={() => handleFinishPomodoro(true)} color="success">
              Concluir
            </Button>
          </S.ButtonsContainer>

          <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
            <S.ModalContentContainer>
              <h3>Como foi o seu pomodoro?</h3>

              <S.EmojiScoreContainer>
                {emojisScore.map((score) => (
                  <S.EmojiScore
                    key={score.description}
                    onClick={() => savePomodoroInfo(score)}
                  >
                    <span>{score.emoji}</span>
                    <span>{score.description}</span>
                  </S.EmojiScore>
                ))}
              </S.EmojiScoreContainer>
            </S.ModalContentContainer>
          </Modal>
        </S.CountdownContainer>
      )}
    </AppCard>
  );
};
