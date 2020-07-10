import { PauseOutlined } from "@ant-design/icons";
import React from "react";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";

function PauseGameButton() {
  const dispatch = useDispatch();

  // get the timeGame fuction
  const timeGame = () => dispatch(gameBoardActions.timeGame());

  return (
    <Tooltip title="Pause Game">
      <PauseOutlined className="iconButton" onClick={timeGame} />
    </Tooltip>
  );
}

export default PauseGameButton;
