import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import AppCard from "../../AppCard";
import { Button } from "../../Button";
import { Countdown } from "../../Countdown";
import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { useModal } from "../../Modal/useModal";

import * as S from "./styles";

type taskState = "IDLE" | "IN_PROGRESS" | "FINISHED";

type ITask = {
  title: string;
  startTime: string;
  endTime: string;
};

export const HomeComponentPage: React.FC = () => {
  const [task, setTask] = useState<ITask>({} as ITask);
  const [taskState, setTaskState] = useState<taskState>("IDLE");
  const { isOpen, toggleModal } = useModal();

  function handleInitPomodoro(evt: FormEvent) {
    evt.preventDefault();
    toggleModal();

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

  function handleFinishPomodoro() {
    toggleModal();
  }

  function savePomodoroInfo() {
    const tasks = localStorage.getItem("@pomotasks/tasks");

    const endTask: ITask = {
      ...task,
      endTime: new Date().toLocaleString(),
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
                console.log(evt.currentTarget.value);
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

          <Countdown onComplete={handleFinishPomodoro} />

          <S.ButtonsContainer>
            <Button onClick={handleGiveUpPomodoro} color="danger">
              Abandonar
            </Button>
            <Button onClick={handleFinishPomodoro} color="success">
              Concluir
            </Button>
          </S.ButtonsContainer>

          <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <S.ModalContentContainer>
              <h3>Como foi o seu pomodoro?</h3>

              <S.EmojiScoreContainer>
                <S.EmojiScore>
                  <span>🤩</span>
                  <span>Focado</span>
                </S.EmojiScore>
                <S.EmojiScore>
                  <span>😐</span>
                  <span>Neutro</span>
                </S.EmojiScore>
                <S.EmojiScore>
                  <span>😔</span>
                  <span>Sem foco</span>
                </S.EmojiScore>
              </S.EmojiScoreContainer>
            </S.ModalContentContainer>
          </Modal>
        </S.CountdownContainer>
      )}
    </AppCard>
  );
};
