import * as React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="centerLoader">
      <Backdrop
        open={true}
        sx={{
          transform: "translateZ(0)",
          color: "#212529",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" size="5rem" />
      </Backdrop>
    </div>
  );
};

export default Loading;
