import React from "react";
import Spot from "./spot";

function Board(props) {
  const board = props.board;

  return (
    <div id="board">
      <Spot id="1" onClick={props.onClickedToSpots} value={board[0][0]} />
      <Spot id="2" onClick={props.onClickedToSpots} value={board[0][1]} />
      <Spot id="3" onClick={props.onClickedToSpots} value={board[0][2]} />

      <Spot id="4" onClick={props.onClickedToSpots} value={board[1][0]} />
      <Spot id="5" onClick={props.onClickedToSpots} value={board[1][1]} />
      <Spot id="6" onClick={props.onClickedToSpots} value={board[1][2]} />

      <Spot id="7" onClick={props.onClickedToSpots} value={board[2][0]} />
      <Spot id="8" onClick={props.onClickedToSpots} value={board[2][1]} />
      <Spot id="9" onClick={props.onClickedToSpots} value={board[2][2]} />
    </div>
  );
}

export default Board;
