import React from "react";
import Box from "@mui/material/Box";

interface SlideContentWrapperProp {
  children: any;
}

const SlideContentWrapper: React.FC<SlideContentWrapperProp> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: "white",
        padding: "20px 20px 60px",
        display: "flex",
        flexDirection: "column",
        "&:before": {
          content: '""',
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        },
        "& > *": {
          position: "relative",
          zIndex: 3,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SlideContentWrapper;
