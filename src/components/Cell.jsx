import React from "react";
import "../style/cell.css";

function Cell(props) {
  return (
    <div className="cell" id={props.id} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Cell;
