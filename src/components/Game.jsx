import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Board from "./Board";
import Minimax from "../minimax";

function Game(props) {
  const handleClick = (event) => {
    const targetCell = event.target;
    const targetCellID = targetCell.getAttribute("id");
    const indexesOfTargetCell = coordination[targetCellID];

    if (targetCell.innerText !== EMPTY) {
      setShowWarningModal(!showWarningModal);
    } else {
      if (settings.gameMode === "PvC") {
        targetCell.innerText = players.user;
        updateBoardState(...indexesOfTargetCell, players.user);

        if (!minimax.getDepth()) {
          setShowResultModal(!showResultModal);
        } else {
          const bestValuesForComputer = minimax.max();
          updateBoardState(
            bestValuesForComputer.row,
            bestValuesForComputer.col,
            players.opponnent
          );

          if (minimax.isFinished()) {
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

        updateBoardState(...indexesOfTargetCell, turn);
        if (minimax.isFinished()) {
          setShowResultModal(!showResultModal);
        }
      }
    }
  };

  const updateBoardState = (row, col, player) => {
    let currentBoard = board;
    currentBoard[row][col] = player;
    setBoard(currentBoard);
    forceUpdate();
  };

  const playAgain = () => {
    setShowResultModal(!showResultModal);
    setBoard(initialBoard);
  };

  const closeWarningModal = () => {
    setShowWarningModal(!showWarningModal);
  };

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
  const minimax = new Minimax(board, players);
  let modalDatas = {
    title: undefined,
    bodyText: undefined,
  };
  const coordination = {
    "cell-1": [0, 0],
    "cell-2": [0, 1],
    "cell-3": [0, 2],
    "cell-4": [1, 0],
    "cell-5": [1, 1],
    "cell-6": [1, 2],
    "cell-7": [2, 0],
    "cell-8": [2, 1],
    "cell-9": [2, 2],
  };

  if (showResultModal) {
    let finalPoint = minimax.returnValueOfPosition();
    if (finalPoint === 0) {
      modalDatas.title = "Draw";
      modalDatas.bodyText = "The match ended in a draw!";
    }
    if (finalPoint === 1) {
      modalDatas.title = "Game Over";
      modalDatas.bodyText = "O won!";
    }
    if (finalPoint === -1) {
      modalDatas.title = "Game Over";
      modalDatas.bodyText = "X won!";
    }
  }

  if (
    settings.gameMode === "PvC" &&
    players.user === "O" &&
    board.toString() === initialBoard.toString() // "Objects" don't equal each other even though they're the same, so we should turn the objects into string forms for a true comparison.
  ) {
    const bestValuesForComputer = minimax.max();
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
          <Modal.Title>You cannot move to a filled cell.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You just tried to move to a filled cell.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeWarningModal}>
            Close
          </Button>
          <Button onClick={closeWarningModal}>OK</Button>
        </Modal.Footer>
      </Modal>

      <Board board={board} onClickedToCells={handleClick} />
    </>
  );
}

export default Game;
