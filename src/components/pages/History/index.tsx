import { useEffect, useState } from "react";
import { getDateOnly } from "../../../utils/getDateOrTimeOnly";
import { getDayFromDate } from "../../../utils/getDayFromDate";
import { TasksList } from "../../TasksList";
import { IPomotask } from "../Home";
import * as S from "./styles";

type IPomotasksByDay = {
  date: string;
  tasks: IPomotask[];
};

export const HistoryPageComponent: React.FC = () => {
  const [pomotasksByDay, setPomotasksByDay] = useState<IPomotasksByDay[]>([]);

  useEffect(() => {
    const tasksOnStorage = localStorage.getItem("@pomotasks/tasks");
    if (tasksOnStorage) {
      const pomotasks: IPomotask[] = JSON.parse(tasksOnStorage);

      const pomotasksByDate = pomotasks
        .reverse()
        .reduce((pomotasks, pomotask) => {
          const pomotasksOfDay = pomotasks.find(
            (task) => task.date === getDateOnly(pomotask.startTime)
          );

          const pomotasksOfOtherDays = pomotasks.filter(
            (task) => task.date !== getDateOnly(pomotask.startTime)
          );

          return [
            ...pomotasksOfOtherDays,
            {
              date: getDateOnly(pomotask.startTime),
              tasks: pomotasksOfDay
                ? [...pomotasksOfDay.tasks, pomotask]
                : [pomotask],
            },
          ];
        }, [] as IPomotasksByDay[]);

      setPomotasksByDay(pomotasksByDate);
    }
  }, []);

  return (
    <S.Container>
      <S.PageTitle>Recent Pomotasks 🎯</S.PageTitle>

      {pomotasksByDay.map((pomotasksOfDay, index) => (
        <S.PomotasksListContainer key={index}>
          <TasksList
            title={`${getDayFromDate(pomotasksOfDay.date)} - ${
              pomotasksOfDay.date
            }`}
            tasks={pomotasksOfDay.tasks}
          />
        </S.PomotasksListContainer>
      ))}
    </S.Container>
  );
};
