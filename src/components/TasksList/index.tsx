import { useCallback, useMemo } from "react";
import { emojisScore } from "../../data/emojisScore";
import { IPomotask } from "../pages/Home";

import * as S from "./styles";

type TasksListProps = {
  title: string;
  tasks: IPomotask[];
};

export const TasksList: React.FC<TasksListProps> = ({ title, tasks }) => {
  function getHourAndMinute(time: string) {
    return time.split(" ")[1].substring(0, 5);
  }

  const totalEachScoreEmoji = useMemo(() => {
    return emojisScore.map((score) => ({
      emoji: score.emoji,
      total: tasks.filter((task) => task.score.emoji === score.emoji).length,
    }));
  }, [tasks]);

  return (
    <S.Container>
      <S.ListHeader>
        <S.Title>{title}</S.Title>
        <S.Summary>
          {totalEachScoreEmoji.map((score) => (
            <S.ScoreSummary key={score.emoji}>
              <S.ScoreFeeling>{score.emoji}</S.ScoreFeeling>
              <S.ScoreTotal>{score.total}</S.ScoreTotal>
            </S.ScoreSummary>
          ))}
        </S.Summary>
      </S.ListHeader>

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
