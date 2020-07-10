import React, { useState } from "react";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";

/**
 * Option to start a new game, with a confirmation dialog
 */
function NewGameButton() {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    dispatch(gameBoardActions.createGame());
    setShowConfirm(false);
  };

  return (
    <>
      <Tooltip title="Start a new game">
        <PlusOutlined
          className="iconButton"
          onClick={() => setShowConfirm(true)}
        />
      </Tooltip>
      {showConfirm ? (
        <ConfirmationModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
          message="This game will be considered a lost. Are you sure you want to start a new game?"
          className="adjustToGameOptions"
        />
      ) : null}
    </>
  );
}
export default NewGameButton;
