import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/board";

function App() {
  const saveSettings = () => {
    setShowBoard(!showBoard);
  };

  const [showBoard, setShowBoard] = useState(false);
  let settings = {
    gameMode: undefined,
    sideOfUser: undefined,
  };

  if (showBoard) {
    return <Board />;
  }
  return (
    <>
      <div id="settings-gui">
        <div>
          <h2>Select Game Mode</h2>
          <div className="option" onClick={() => (settings.gameMode = "PvP")}>
            Player vs Player
          </div>
          <div className="option" onClick={() => (settings.gameMode = "PvC")}>
            Player vs Computer
          </div>
        </div>
        <div className="mt-5">
          <h2>Select Your Side</h2>
          <div className="option" onClick={() => (settings.sideOfUser = "X")}>
            <b>X</b>
          </div>
          <div className="option" onClick={() => (settings.sideOfUser = "O")}>
            <b>O</b>
          </div>
        </div>
        <br /> <br /> <br />
        <Button onClick={saveSettings}>OK</Button>
      </div>
    </>
  );
}

export default App;
