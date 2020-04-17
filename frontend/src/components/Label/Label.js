import React from "react";
const Label = (props) => {
  return (
    <label {...props} className="Label">
      {props.children}
    </label>
  );
};

export default Label;
