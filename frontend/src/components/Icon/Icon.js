import React from "react";
import "./Icon.css";

const Icon = (props) => {
  const dynamicStyle = {
    ...props,
    MaskImage:
      `url(` + require(`../../assets/icons/${props.iconName}.svg`) + `)`,
    WebkitMaskImage:
      `url(` + require(`../../assets/icons/${props.iconName}.svg`) + `)`,
  };

  return (
    <div style={dynamicStyle} className="Icon" onClick={props.onClick} />    
  );
};

export default Icon;
