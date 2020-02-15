import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="psoload">
      <div className="straight"></div>
      <div className="curve"></div>
      <div className="center"></div>
      <div className="inner"></div>
    </div>
  );
};

export default Loader;
