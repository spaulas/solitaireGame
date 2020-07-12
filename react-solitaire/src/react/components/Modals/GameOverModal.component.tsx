/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import {
  CalendarFilled,
  CheckOutlined,
  ClockCircleFilled,
  NumberOutlined,
  StarFilled
} from "@ant-design/icons";
import { ExplicitAny, RootReducerState } from "../../../global";
import { Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertTime } from "../DataDisplay/Timer.component";
import goalActions from "../../../redux/goal/goal.actions";
import highscoresActions from "../../../redux/highScores/highscores.actions";
import moment from "moment";
import { useHistory } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

interface HighScore {
  userName: string;
  finalScore: number;
}

function GameOverModal() {
  const [visible, setVisible] = useState(true);
  const [inputRef, setInputRef] = useState<ExplicitAny>();
  const history = useHistory();
  const dispatch = useDispatch();

  // get gameOver value from redux
  const {
    gameOver,
    gameMoves,
    gameTime,
    nHints,
    userName,
    hasNewHighScore
  } = useSelector(
    ({ Goal, GameBoard, User, HighScores }: RootReducerState) => ({
      gameOver: Goal.gameOver,
      gameMoves: GameBoard.gameMoves,
      gameTime: GameBoard.gameTime,
      nHints: GameBoard.nHints,
      userName: User.userName,
      hasNewHighScore: HighScores.hasNewHighScore
    })
  );

  const getIcon = (item: string) => {
    switch (item) {
      case "date":
        return <CalendarFilled />;
      case "time":
        return <ClockCircleFilled />;
      case "moves":
        return <NumberOutlined />;
      case "nHints":
        return <StarFilled />;
      default:
        return <CheckOutlined />;
    }
  };

  const gameStatistics: ExplicitAny = {
    date: moment().format("DD/MM/YYYY, hh:mm"),
    time: convertTime(gameTime),
    moves: gameMoves,
    nHints: nHints,
    finalScore: gameMoves + nHints * 5
  };

  const saveUserGame = () => {
    if (gameOver) {
      inputRef?.focus();
      dispatch(userActions.gameOver(gameStatistics, gameTime));
      dispatch(highscoresActions.hasNewHighScore(gameStatistics.finalScore));
    }
  };
  useEffect(saveUserGame, [gameTime]);

  const handleCloseModal = () => {
    if (hasNewHighScore) {
      const finalUserName = inputRef.state.value || userName;
      dispatch(
        highscoresActions.addHighScore(finalUserName, gameStatistics.finalScore)
      );

      if (finalUserName !== userName) {
        dispatch(userActions.changeUserName(finalUserName));
      }
    }

    setVisible(false);
    history.push("/");

    dispatch(goalActions.resetCardDragging());
  };

  if (gameOver && visible) {
    return (
      <div className="gameFullDiv">
        <div className="gameOverStatistics">
          <div>Game Statistics</div>
          {hasNewHighScore && (
            <div className="newHighScoreContainer">
              <div>New HighScore!</div>
              <Input
                ref={(e: ExplicitAny) => setInputRef(e)}
                placeholder="Add here a username"
                defaultValue={userName}
              />
            </div>
          )}
          <List
            dataSource={Object.keys(gameStatistics)}
            renderItem={(item: string) => (
              <List.Item key={item} className="gameStatisticsList">
                {getIcon(item)}
                <List.Item.Meta title={item} />
                <span>{gameStatistics[item].toString()}</span>
              </List.Item>
            )}
          />
          <div
            className={`animatedButton divButton gameOverAnimatedButton`}
            onClick={handleCloseModal}
          >
            <span>Ok</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default GameOverModal;
