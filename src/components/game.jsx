import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Spot from "./spot";

function Game(props) {
  // Functions
  const handleClick = (e) => {
    const spotID = e.target.getAttribute("id");
    const indexes = coordination[spotID];

    if (settings.gameMode === "PvC") {
      // If game mode is "Player vs Computer" ...

      e.target.innerText = players.user; // Place the mark of user to the target spot having in DOM

      // Place the mark of user to the target spot of `board` array/state.
      updateBoardState(indexes[0], indexes[1]);

      if (returnValueOfPosition(board) || !getDepth(board)) {
        // Did game finish ? In this case:
        setIsResultModalVisible(!isResultModalVisible);
      } else {
        // otherwise:
        const bestValues = max(board);
        updateBoardState(bestValues.row, bestValues.col, players.opponnent);
        forceUpdate(); // Forcing React to re-render
      }
    } else {
      // Otherwise, if the game mode is PvP:
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
      } else if (countOfX === countOfO) {
        turn = "X";
      } else if (countOfX > countOfO) {
        turn = "O";
      }

      e.target.innerText = turn; // Place the mark of user to the target spot having in DOM

      // Place the mark of user to the target spot of `board` array/state.
      updateBoardState(indexes[0], indexes[1], turn);

      if (returnValueOfPosition(board) || !getDepth(board)) {
        // Did game finish ? In this case:
        setIsResultModalVisible(!isResultModalVisible);
      }
    }
  };

  const playAgain = () => {
    setIsResultModalVisible(!isResultModalVisible);
    setBoard(initialBoard);
  };

  // used for updating the `board` array easily.
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

  let coordination = {
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
    if (finalPoint === -1) {
      modalDatas.title = "User";
      modalDatas.bodyText = "User Has Won !";
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
        <Spot id="1" onClick={handleClick} value={board[0][0]} />
        <Spot id="2" onClick={handleClick} value={board[0][1]} />
        <Spot id="3" onClick={handleClick} value={board[0][2]} />

        <Spot id="4" onClick={handleClick} value={board[1][0]} />
        <Spot id="5" onClick={handleClick} value={board[1][1]} />
        <Spot id="6" onClick={handleClick} value={board[1][2]} />

        <Spot id="7" onClick={handleClick} value={board[2][0]} />
        <Spot id="8" onClick={handleClick} value={board[2][1]} />
        <Spot id="9" onClick={handleClick} value={board[2][2]} />
      </div>
    </>
  );
}

export default Game;
