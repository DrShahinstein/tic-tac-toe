import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Spot from "./components/spot";

function App() {
  const [showBoard, setShowBoard] = useState(true);
  const players = {
    player1: "X",
    player2: "O",
  };
  const handleClick = (e) => {
    e.target.innerText = players.player1;
  };

  const resetBoard = () => {
    for (let i of document.getElementsByClassName("spot")) {
      i.innerText = "";
    }
  };

  if (showBoard) {
    return (
      <div id="settings-gui">
        <h2>Select the Game Mode</h2>
        <ListGroup>
          <ListGroup.Item>Player vs Player</ListGroup.Item>
          <ListGroup.Item>Player vs Computer</ListGroup.Item>
        </ListGroup>
        <h2>Select Your Side</h2>
        <ListGroup>
          <ListGroup.Item>X</ListGroup.Item>
          <ListGroup.Item>O</ListGroup.Item>
        </ListGroup>
        <Button onClick={() => setShowBoard(!showBoard)}>OK</Button>
      </div>
    );
  } else {
    return (
      <>
        <div id="board">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => {
            return (
              <Spot
                id={"spot-" + element}
                onClick={handleClick}
                key={element}
              />
            );
          })}
        </div>
        <ListGroup>
          <Button className="mb-2">Go Back to Settings</Button>
          <Button onClick={resetBoard}>Reset the Board</Button>
        </ListGroup>
      </>
    );
  }
}

export default App;
