import React from "react";
import "./Icon.css";

/*
props.iconName = The name of the icon, will be used inside the dynamicStyle in order to get the dynamic path of the icon
...props = Add any dynamic style to the icon, for example a different size
if you want to change the size of the icon, don't forget to change inline SVG width & height and also in className
*/

const Icon = props => {
  const dynamicStyle = {
    ...props,
    MaskImage:
      `url(` + require(`../../assets/icons/${props.iconName}.svg`) + `)`,
    WebkitMaskImage:
      `url(` + require(`../../assets/icons/${props.iconName}.svg`) + `)`
  };

  return (
    <div style={dynamicStyle} className="Icon" onClick={props.onClick}>
      x
    </div>
  );
};

export default Icon;
