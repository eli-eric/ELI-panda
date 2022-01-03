import React, { ReactNode } from "react";
import { alpha } from "@mui/material";
import Card from "@mui/material/Card";
import { lighten } from "@mui/system";

interface CardWrapperProps {
  children: ReactNode;

  [x: string]: any;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, ...rest }) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "1px solid #e8e5dd",
        backgroundColor: (theme) => lighten(theme.palette.common.black, 0.1),
        color: (theme) => theme.palette.common.white,
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: -26,
          zIndex: 1,
          height: 55,
          width: "calc(100% + 30px)",
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1),
          transform: "rotate(10deg)",
        },
      }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default CardWrapper;
