import React from "react";
import "./FoodItem.css";
import {MdAddCircle} from 'react-icons/md';

function FoodItem(props) {
  return (
    <div className="FoodItem">
      <div className="food">
        <img src={props.img.thumb} width="50px" height="50px" alt="food" />

        <h4>{props.name}</h4>
        <p>{props.calories.toFixed(0)}</p>
      </div>

      <MdAddCircle className="h2"/>
    </div>
  );
}

export default FoodItem;
