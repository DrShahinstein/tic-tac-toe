import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Board from "./board";

function Game(props) {
  // Functions
  const handleClick = (event) => {
    const targetSpot = event.target;
    const targetSpotID = targetSpot.getAttribute("id");
    const indexesOfTargetSpot = coordination[targetSpotID];

    if (targetSpot.innerText !== EMPTY) {
      setShowWarningModal(!showWarningModal);
    } else {
      if (settings.gameMode === "PvC") {
        targetSpot.innerText = players.user;
        updateBoardState(...indexesOfTargetSpot, players.user);

        if (!getDepth()) {
          setShowResultModal(!showResultModal);
        } else {
          const bestValuesForComputer = max();
          updateBoardState(
            bestValuesForComputer.row,
            bestValuesForComputer.col,
            players.opponnent
          );

          if (isFinished()) {
            setShowResultModal(!showResultModal);
          }
        }
      } else {
        let countOfX = 0;
        let countOfO = 0;
        let turn;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === "X") countOfX += 1;
            else if (board[i][j] === "O") countOfO += 1;
          }
        }

        if (!countOfX && !countOfO) {
          turn = "X";
        } else if (countOfX && !countOfO) {
          turn = "O";
        } else if (countOfX === countOfO) {
          turn = "X";
        } else if (countOfX > countOfO) {
          turn = "O";
        } else if (countOfO > countOfX) {
          turn = "X";
        }

        updateBoardState(...indexesOfTargetSpot, turn);
        if (isFinished()) {
          setShowResultModal(!showResultModal);
        }
      }
    }
  };

  const min = () => {
    const valueOfPosition = returnValueOfPosition();

    if (isFinished()) {
      return valueOfPosition;
    }

    let maxValue = Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = players.user;
          const bestValuesForComputer = max();

          if (bestValuesForComputer.point < maxValue) {
            maxValue = bestValuesForComputer.point;
          }
          board[i][j] = EMPTY;
        }
      }
    }

    return maxValue;
  };

  const max = () => {
    const valueOfPosition = returnValueOfPosition();

    if (isFinished()) {
      return { point: valueOfPosition, row: -1, col: -1 };
    }

    let lowestValue = -Infinity;
    let bestRow = undefined;
    let bestCol = undefined;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = players.opponnent;
          const bestPointForUser = min();

          if (bestPointForUser > lowestValue) {
            lowestValue = bestPointForUser;
            bestRow = i;
            bestCol = j;
          }
          board[i][j] = EMPTY;
        }
      }
    }
    return {
      point: lowestValue,
      row: bestRow,
      col: bestCol,
    };
  };

  const returnValueOfPosition = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== EMPTY
      ) {
        if (board[0][i] === players.user) return -1;
        else return 1;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== EMPTY
      ) {
        if (board[i][0] === players.user) return -1;
        else return 1;
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== EMPTY
    ) {
      if (board[0][0] === players.user) return -1;
      else return 1;
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== EMPTY
    ) {
      if (board[0][2] === players.user) return -1;
      else return 1;
    }
    return 0;
  };

  const updateBoardState = (row, col, player) => {
    let currentBoard = board;
    currentBoard[row][col] = player;
    setBoard(currentBoard);
    forceUpdate();
  };

  const isFinished = () => {
    if ((!getDepth() && !returnValueOfPosition()) || returnValueOfPosition()) {
      return true;
    }
    return false;
  };

  const getDepth = () => {
    let count = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) count += 1;
      }
    }

    return count;
  };

  const playAgain = () => {
    setShowResultModal(!showResultModal);
    setBoard(initialBoard);
  };

  const closeWarningModal = () => {
    setShowWarningModal(!showWarningModal);
  };

  // Others (variables, states, JSX ...)
  const EMPTY = "";
  const initialBoard = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const forceUpdate = React.useReducer(() => ({}))[1];

  const settings = props.settings;
  const players = {
    user: settings.user,
    opponnent: settings.user === "X" ? "O" : "X",
  };
  let modalDatas = {
    title: undefined,
    bodyText: undefined,
  };
  const coordination = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
  };

  if (showResultModal) {
    let finalPoint = returnValueOfPosition();
    if (finalPoint === 0) {
      modalDatas.title = "Draw";
      modalDatas.bodyText = "Match Has Ended with Draw !";
    }
    if (finalPoint === 1) {
      modalDatas.title = "Opponnent";
      modalDatas.bodyText = "Opponnent Has Won !";
    }
    if (finalPoint === -1) {
      modalDatas.title = "User";
      modalDatas.bodyText = "User Has Won !";
    }
  }

  if (
    settings.gameMode === "PvC" &&
    players.user === "O" &&
    board === initialBoard
  ) {
    const bestValuesForComputer = max();
    updateBoardState(
      bestValuesForComputer.row,
      bestValuesForComputer.col,
      players.opponnent
    );
  }

  return (
    <>
      <Modal show={showResultModal}>
        <Modal.Header>
          <Modal.Title>{modalDatas.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalDatas.bodyText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Go back to Settings
          </Button>
          <Button onClick={playAgain}>Play Again</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWarningModal}>
        <Modal.Header>
          <Modal.Title>You Cannot Move to a Filled Spot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You've tried to move to a filled spot but you it's illegal.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeWarningModal}>
            Close
          </Button>
          <Button onClick={closeWarningModal}>OK</Button>
        </Modal.Footer>
      </Modal>

      <Board board={board} onClickedToSpots={handleClick} />
    </>
  );
}

export default Game;
