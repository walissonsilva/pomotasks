import { ITask } from "../pages/Home";

import * as S from "./styles";

type TasksListProps = {
  title: string;
  tasks: ITask[];
};

export const TasksList: React.FC<TasksListProps> = ({ title, tasks }) => {
  function getHourAndMinute(time: string) {
    return time.split(" ")[1].substring(0, 5);
  }

  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}

      <S.List>
        {tasks.map((task, index) => (
          <S.Task key={index}>
            <S.Score>{task.score.emoji}</S.Score>
            <S.Description>{task.title}</S.Description>
            <S.Time>
              <S.Start>{"⏳ " + getHourAndMinute(task.startTime)}</S.Start>
              <S.End>{"⌛️ " + getHourAndMinute(task.endTime)}</S.End>
            </S.Time>
          </S.Task>
        ))}
      </S.List>
    </S.Container>
  );
};
