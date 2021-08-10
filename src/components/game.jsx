import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Spot from "./spot";

function Game(props) {
  // Functions
  const handleClick = (e) => {
    if (settings.gameMode === "PvC") {
      // If game mode is "Player vs Computer" ...

      e.target.innerText = players.user; // Place the mark of user to the target spot having in DOM

      // Place the mark of user to the target spot of `board` array/state.
      const spotID = e.target.getAttribute("id");

      switch (spotID) {
        case "spot-1":
          updateBoardState(0, 0);
          break;

        case "spot-2":
          updateBoardState(0, 1);
          break;

        case "spot-3":
          updateBoardState(0, 2);
          break;

        case "spot-4":
          updateBoardState(1, 0);
          break;

        case "spot-5":
          updateBoardState(1, 1);
          break;

        case "spot-6":
          updateBoardState(1, 2);
          break;

        case "spot-7":
          updateBoardState(2, 0);
          break;

        case "spot-8":
          updateBoardState(2, 1);
          break;

        case "spot-9":
          updateBoardState(2, 2);
          break;

        default:
        //
      }

      if (returnValueOfPosition(board) || !getDepth(board)) {
        // Did game finish ? In this case:
        setIsResultModalVisible(!isResultModalVisible);
      } else {
        // otherwise:
        const bestValues = max(board);
        updateBoardState(bestValues.row, bestValues.col, players.opponnent);
      }
    } else {
      // Otherwise, if the game mode is PvP:
    }
  };

  const playAgain = () => {
    setIsResultModalVisible(!isResultModalVisible);
    setBoard(initialBoard);
  };

  const updateBoardState = (row, col, player = players.user) => {
    let newBoard = board;
    newBoard[row][col] = player;
    setBoard(newBoard);
  };

  const min = (board) => {
    const valueOfPosition = returnValueOfPosition(board);

    if (valueOfPosition !== 0 || getDepth(board) === 0) {
      return valueOfPosition;
    }

    let highestValue = Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = players.user;
          const bestValuesForComputer = max(board);

          if (bestValuesForComputer["point"] < highestValue) {
            highestValue = bestValuesForComputer.point;
            // console.log(highestValue)
          }
          board[i][j] = EMPTY;
        }
      }
    }

    return highestValue;
  };

  const max = (board) => {
    const valueOfPosition = returnValueOfPosition(board);

    if (valueOfPosition !== 0 || getDepth(board) === 0) {
      return { point: valueOfPosition, row: -1, col: -1 };
    }

    let highestValue = -Infinity;
    let bestRow = undefined;
    let bestCol = undefined;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = players.opponnent;
          const bestPointForUser = min(board);

          if (bestPointForUser > highestValue) {
            highestValue = bestPointForUser;
            bestRow = i;
            bestCol = j;
          }
          board[i][j] = EMPTY;
        }
      }
    }
    return {
      point: highestValue,
      row: bestRow,
      col: bestCol,
    };
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

  // Others (variables, states, JSX ...)
  const EMPTY = "";

  const initialBoard = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];

  const [board, setBoard] = useState(initialBoard);

  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const settings = props.settings;

  const players = {
    user: settings.user,
    opponnent: settings.user === "X" ? "O" : "X",
  };

  let modalDatas = {
    title: undefined,
    bodyText: undefined,
  };

  if (isResultModalVisible) {
    let finalPoint = max(board).point;
    if (finalPoint === 0) {
      modalDatas.title = "Draw";
      modalDatas.bodyText = "Match Has Ended with Draw !";
    }
    if (finalPoint === 1) {
      modalDatas.title = "Computer";
      modalDatas.bodyText = "Computer Has Won !";
    }
  }

  return (
    <>
      <Modal show={isResultModalVisible}>
        <Modal.Header>
          <Modal.Title>{modalDatas.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {modalDatas.bodyText} <br />
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
      <Modal show={isWarningModalVisible}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You cannot move to a filled spot</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setIsWarningModalVisible(!isWarningModalVisible)}
            variant="secondary"
          >
            Close
          </Button>
          <Button
            onClick={() => setIsWarningModalVisible(!isWarningModalVisible)}
          >
            OK
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
