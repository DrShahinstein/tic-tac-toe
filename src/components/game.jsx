import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Spot from "./spot";

function Game(props) {
  // Functions
  const handleClick = (e) => {
    console.log(settings);
    if (settings.gameMode === "PvC") {
      e.target.innerText = players.user;
      const spotID = e.target.getAttribute("id");
      let newBoard = board;
      switch (spotID) {
        case "spot-1":
          newBoard[0][0] = players.user;
          setBoard(newBoard);
          break;
        case "spot-2":
          newBoard[0][1] = players.user;
          setBoard(newBoard);
          break;
        case "spot-3":
          newBoard[0][2] = players.user;
          setBoard(newBoard);
          break;
        case "spot-4":
          newBoard[1][0] = players.user;
          setBoard(newBoard);
          break;
        case "spot-5":
          newBoard[1][1] = players.user;
          setBoard(newBoard);
          break;
        case "spot-6":
          newBoard[1][2] = players.user;
          setBoard(newBoard);
          break;
        case "spot-7":
          newBoard[2][0] = players.user;
          setBoard(newBoard);
          break;
        case "spot-8":
          newBoard[2][1] = players.user;
          setBoard(newBoard);
          break;
        case "spot-9":
          newBoard[2][2] = players.user;
          setBoard(newBoard);
          break;

        default:
        //
      }

      if (returnValueOfPosition(board) || !getDepth(board)) {
        setIsModalVisible(!isModalVisible);
      }
    } else {
      // Code
    }
  };

  const playAgain = () => {
    setIsModalVisible(!isModalVisible);
    setBoard(initialBoard);
  };

  const returnValueOfPosition = (position) => {
    for (let i = 0; i < 3; i++) {
      if (
        position[0][i] === position[1][i] &&
        position[1][i] === position[2][i] &&
        position[0][i] !== ""
      ) {
        if (position[0][i] === players.user) return -1;
        else return 1;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        position[i][0] === position[i][1] &&
        position[i][1] === position[i][2] &&
        position[i][0] !== ""
      ) {
        if (position[i][0] === players.user) return -1;
        else return 1;
      }
    }

    if (
      position[0][0] === position[1][1] &&
      position[1][1] === position[2][2] &&
      position[0][0] !== ""
    ) {
      if (position[0][0] === players.user) return -1;
      else return 1;
    }

    if (
      position[0][2] === position[1][1] &&
      position[1][1] === position[2][0] &&
      position[0][2] !== ""
    ) {
      if (position[0][2] === players.user) return -1;
      else return 1;
    }
    return 0;
  };

  const getDepth = (position) => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (position[i][j] === "") {
          count += 1;
        }
      }
    }
    return count;
  };

  // Others
  const EMPTY = "";
  const initialBoard = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];

  const [board, setBoard] = useState(initialBoard);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const settings = props.settings;
  const players = {
    user: settings.user,
    opponnent: settings.user === "X" ? "O" : "X",
  };
  return (
    <>
      <Modal show={isModalVisible}>
        <Modal.Header>
          <Modal.Title>[ RESULT ]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            [?] Has Won the Game ! <br />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={playAgain}>
            Play Again
          </Button>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Go Back to Settings
          </Button>
        </Modal.Footer>
      </Modal>

      <div id="board">
        <Spot id="spot-1" onClick={handleClick} value={board[0][0]} />
        <Spot id="spot-2" onClick={handleClick} value={board[0][1]} />
        <Spot id="spot-3" onClick={handleClick} value={board[0][2]} />

        <Spot id="spot-4" onClick={handleClick} value={board[1][0]} />
        <Spot id="spot-5" onClick={handleClick} value={board[1][1]} />
        <Spot id="spot-6" onClick={handleClick} value={board[1][2]} />

        <Spot id="spot-7" onClick={handleClick} value={board[2][0]} />
        <Spot id="spot-8" onClick={handleClick} value={board[2][1]} />
        <Spot id="spot-9" onClick={handleClick} value={board[2][2]} />
      </div>
    </>
  );
}

export default Game;
