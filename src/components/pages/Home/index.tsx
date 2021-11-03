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

export type IPomotask = {
  title: string;
  startTime: string;
  endTime: string;
  score: IEmojiScore;
};

export const HomeComponentPage: React.FC = () => {
  const [pomotaskTitle, setPomotaskTitle] = useState("");
  const [task, setTask] = useState<IPomotask>({} as IPomotask);
  const [todayPomotasks, setTodayPomotasks] = useState<IPomotask[]>([]);
  const [taskState, setTaskState] = useState<ITaskState>("IDLE");
  const { isOpen: isModalOpen, openModal, toggleModal } = useModal();

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission(() => {
        sendBrowserNotification("Pomotasks", "This is an notification example");
      });
    }

    loadTodayTasksFromLocalStorage();
  }, []);

  function loadTodayTasksFromLocalStorage() {
    const tasksOnStorage = localStorage.getItem("@pomotasks/tasks");
    if (tasksOnStorage) {
      const pomotasks: IPomotask[] = JSON.parse(tasksOnStorage);

      setTodayPomotasks(
        pomotasks.reverse().filter((pomotask) => {
          const [startDay, startMonth] = pomotask.startTime.split(" ");

          return (
            `${startDay} ${startMonth}` ===
            new Date()
              .toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })
              .replace(",", "")
          );
        })
      );
    }
  }

  function handleInitPomodoro(evt: FormEvent) {
    evt.preventDefault();

    if (pomotaskTitle) {
      setTaskState("IN_PROGRESS");
      setTask({
        ...task,
        title: pomotaskTitle,
        startTime: new Date()
          .toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
          .replace(",", ""),
      });
    } else {
      toast.error("Inform a task name");
    }
  }

  function handleNewTaskPomodoro() {
    setTaskState("IDLE");
    setTask({} as IPomotask);
    setPomotaskTitle("");
  }

  function handleFinishCountdown(triggerFromButton?: boolean) {
    if (
      !triggerFromButton &&
      (taskState === "IN_PROGRESS" || taskState === "INTERRUPTION")
    ) {
      const audio = new Audio("/sounds/beep-short.mp3");
      audio.play();

      if (taskState === "IN_PROGRESS") {
        sendBrowserNotification(task.title, "Pomotask timer is over");
      } else {
        sendBrowserNotification(task.title, "Let's come back to work?");
      }
    }

    if (taskState === "IN_PROGRESS") {
      openModal();
      setTaskState("FINISHED");
    }
  }

  function savePomodoroInfo(score: IEmojiScore) {
    const tasks = localStorage.getItem("@pomotasks/tasks");

    const endedTask: IPomotask = {
      ...task,
      endTime: new Date()
        .toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(",", ""),
      score: score,
    };

    if (tasks) {
      localStorage.setItem(
        "@pomotasks/tasks",
        JSON.stringify([...JSON.parse(tasks), endedTask])
      );
    } else {
      localStorage.setItem("@pomotasks/tasks", JSON.stringify([endedTask]));
    }

    toggleModal();
    loadTodayTasksFromLocalStorage();
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
    <>
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
              value={pomotaskTitle}
              onChange={(evt: FormEvent<HTMLInputElement>) => {
                setPomotaskTitle(evt.currentTarget.value);
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
    </>
  );
};
