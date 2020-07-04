import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

/**
 * Button to start the game, by redirecting to the /game location
 */

function StartButton() {
  const history = useHistory();
  return (
    <Button className="iconButton" onClick={() => history.push("/game")}>
      Start Game
    </Button>
  );
}

export default StartButton;
