import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#80808099",
        position: "absolute",
        zIndex: 99999,
      }}
    >
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "none",
          zIndex: 999,
        }}
      />
    </div>
  );
};

export default Loader;
