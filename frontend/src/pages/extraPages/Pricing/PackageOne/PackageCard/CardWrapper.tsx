import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface CardWrapperProps {
  children: ReactNode;

  [x: string]: any;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        px: 7.5,
        py: 5,
        borderRadius: 4,
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
        "& .popular": {
          position: "absolute",
          right: -30,
          top: -10,
          zIndex: 0,
          maxWidth: 120,
          display: "flex",
          "&:before": {
            content: '""',
            position: "absolute",
            right: -50,
            bottom: -30,
            zIndex: -1,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.background.default,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
