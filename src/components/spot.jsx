import React from "react";
import "../style/spot.css";

function Spot(props) {
  return (
    <div className="spot" id={props.id} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Spot;
