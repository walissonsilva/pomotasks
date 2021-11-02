import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppCard from "../../AppCard";
import { Button } from "../../Button";
import { Countdown } from "../../Countdown";
import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { useModal } from "../../Modal/useModal";

import { emojisScore, IEmojiScore } from "../../../data/emojisScore";

import * as S from "./styles";
import { sendBrowserNotification } from "../../../utils/sendNotification";
import { TasksList } from "../../TasksList";

export type ITaskState = "IDLE" | "IN_PROGRESS" | "FINISHED" | "INTERRUPTION";

export type ITask = {
  title: string;
  startTime: string;
  endTime: string;
  score: IEmojiScore;
};

export const HomeComponentPage: React.FC = () => {
  const [task, setTask] = useState<ITask>({} as ITask);
  const [todayPomotasks, setTodayPomotasks] = useState<ITask[]>([]);
  const [taskState, setTaskState] = useState<ITaskState>("IDLE");
  const { isOpen: isModalOpen, openModal, toggleModal } = useModal();

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission(() => {
        sendBrowserNotification("Pomotasks", "This is an notification example");
      });
    }

    if (taskState === "FINISHED" || !todayPomotasks.length) {
      const tasksOnStorage = localStorage.getItem("@pomotasks/tasks");
      if (tasksOnStorage) {
        const pomotasks: ITask[] = JSON.parse(tasksOnStorage);

        setTodayPomotasks(
          pomotasks
            .reverse()
            .filter(
              (pomotask) =>
                pomotask.startTime.split(" ")[0] ===
                new Date().toLocaleDateString()
            )
        );
      }
    }
  }, [taskState, todayPomotasks]);

  function handleInitPomodoro(evt: FormEvent) {
    evt.preventDefault();

    if (Object.keys(task).length && task.title) {
      setTaskState("IN_PROGRESS");
      setTask({
        ...task,
        startTime: new Date().toLocaleString(),
      });
    } else {
      toast.error("Inform a task name");
    }
  }

  function handleNewTaskPomodoro() {
    setTaskState("IDLE");
    setTask({} as ITask);
  }

  function handleFinishCountdown(triggerFromButton?: boolean) {
    if (
      !triggerFromButton &&
      (taskState === "IN_PROGRESS" || taskState === "INTERRUPTION")
    ) {
      const audio = new Audio("/sounds/beep-short.mp3");
      audio.play();
    }

    if (taskState === "IN_PROGRESS") {
      openModal();
      setTaskState("FINISHED");
      sendBrowserNotification(task.title, "Pomotask timer is over");
    } else if (taskState === "INTERRUPTION") {
      sendBrowserNotification(task.title, "Let's come back to work?");
    }
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

    toggleModal();
  }

  function renderButtons() {
    switch (taskState) {
      case "IN_PROGRESS":
        return (
          <>
            <Button onClick={handleNewTaskPomodoro} color="danger">
              Give up
            </Button>
            <Button onClick={() => handleFinishCountdown(true)} color="success">
              Finish
            </Button>
          </>
        );
      case "FINISHED":
        return (
          <>
            <Button onClick={() => setTaskState("IN_PROGRESS")} color="danger">
              Skip break
            </Button>
            <Button
              onClick={() => setTaskState("INTERRUPTION")}
              color="primary"
            >
              Break
            </Button>
          </>
        );
      case "INTERRUPTION":
        return (
          <>
            <Button onClick={handleNewTaskPomodoro} color="primary">
              New task
            </Button>
            <Button onClick={() => setTaskState("IN_PROGRESS")} color="success">
              Continue
            </Button>
          </>
        );
      default:
        return <></>;
    }
  }

  return (
    <AppCard>
      {taskState === "IDLE" ? (
        <>
          <S.WelcomeMessageContainer>
            <S.HelloMessage>Welcome to</S.HelloMessage>
            <S.WelcomeMessage>PomoTasks ⏰ ✅</S.WelcomeMessage>
          </S.WelcomeMessageContainer>

          <S.InputTaskContainer onSubmit={handleInitPomodoro}>
            <h3>Start a new Pomotask</h3>
            <Input
              placeholder="Type your task here..."
              value={task.title}
              onChange={(evt: FormEvent<HTMLInputElement>) => {
                setTask({
                  ...task,
                  title: evt.currentTarget.value,
                });
              }}
            />
          </S.InputTaskContainer>
        </>
      ) : (
        <S.CountdownContainer>
          {taskState === "INTERRUPTION" ? (
            <>
              <h2>Short Break 🔋</h2>
              <h4>{task.title}</h4>
            </>
          ) : (
            <h2>{task.title} 🎯</h2>
          )}

          {taskState === "INTERRUPTION" || taskState === "IN_PROGRESS" ? (
            <Countdown
              key={Date.now()}
              isModalOpen={isModalOpen}
              taskState={taskState}
              onComplete={handleFinishCountdown}
            />
          ) : (
            <h4>You need to take some rest...</h4>
          )}

          <S.ButtonsContainer>{renderButtons()}</S.ButtonsContainer>

          <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
            <S.ModalContentContainer>
              <h3>How was your pomodoro?</h3>

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

      <TasksList title="Today Pomotasks" tasks={todayPomotasks} />
    </AppCard>
  );
};
