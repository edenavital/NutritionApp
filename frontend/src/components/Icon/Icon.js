import React from "react";
import "./Icon.css";

/*
props.iconName = The name of the icon, will be used inside the dynamicStyle in order to get the dynamic path of the icon
props.style = Add dynamic style to the icon
if you want to change the size of the icon, don't forget to change inline SVG width & height and also in className
*/

const Icon = props => {
  const dynamicStyle = {
    ...props.style,
    MaskImage:
      `url(` + require(`../../assets/icons/${props.iconName}.svg`) + `)`,
    WebkitMaskImage:
      `url(` + require(`../../assets/icons/${props.iconName}.svg`) + `)`
  };

  return (
    <div style={dynamicStyle} className="Icon">
      x
    </div>
  );
};

export default Icon;
