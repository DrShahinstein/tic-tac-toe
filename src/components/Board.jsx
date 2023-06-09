import React from "react";
import Cell from "./Cell";

function Board(props) {
  const board = props.board;

  return (
    <div id="board">
      <Cell id="cell-1" onClick={props.onClickedToCells} value={board[0][0]} />
      <Cell id="cell-2" onClick={props.onClickedToCells} value={board[0][1]} />
      <Cell id="cell-3" onClick={props.onClickedToCells} value={board[0][2]} />
      <Cell id="cell-4" onClick={props.onClickedToCells} value={board[1][0]} />
      <Cell id="cell-5" onClick={props.onClickedToCells} value={board[1][1]} />
      <Cell id="cell-6" onClick={props.onClickedToCells} value={board[1][2]} />
      <Cell id="cell-7" onClick={props.onClickedToCells} value={board[2][0]} />
      <Cell id="cell-8" onClick={props.onClickedToCells} value={board[2][1]} />
      <Cell id="cell-9" onClick={props.onClickedToCells} value={board[2][2]} />
    </div>
  );
}

export default Board;
