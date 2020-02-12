import React from "react";
import "./Label.css";
const Label = props => {
  return (
    <label {...props} className="Label">
      {props.children}
    </label>
  );
};

export default Label;
