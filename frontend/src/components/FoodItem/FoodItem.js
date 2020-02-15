import React from "react";
import "./FoodItem.css";
function FoodItem(props) {
  return (
    <div className="FoodItem">
      <div className="food">
        <img src={props.img.thumb} width="50px" height="50px" alt="food" />

        <h4>{props.name}</h4>
        <p>{props.calories.toFixed(0)}</p>
      </div>

      <img
        className="addIcon"
        src="https://www.pngitem.com/pimgs/m/112-1121197_ios-add-icon-green-hd-png-download.png"
        width="50px"
        height="50px"
        alt="addIcon"
      />
    </div>
  );
}

export default FoodItem;