import React from "react";
import "./Button.css";
const Button = props => {
  return (
    <button {...props} className="Button" style={props.dynamicstyle}>
      {props.children}
    </button>
  );
};

export default Button;
