import React from "react";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import clsx from "clsx";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";

const IconBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.text.disabled,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    padding: 8,
    "&:hover, &:focus": {
      color: theme.palette.primary.main,
    },
    "&.active": {
      color: theme.palette.primary.main,
    },
  };
});

interface ViewSelectButtonsProps {
  pageView: string;
  onChangePageView: (pageView: string) => void;
}

const ViewSelectButtons: React.FC<ViewSelectButtonsProps> = ({
  pageView,
  onChangePageView,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: "auto",
      }}
    >
      <Box>
        <IconBtn
          className={clsx({
            active: pageView === "grid",
          })}
          onClick={() => onChangePageView("grid")}
          size="large"
        >
          <AppsIcon />
        </IconBtn>
      </Box>
      <Box
        sx={{
          ml: 3.5,
        }}
      >
        <IconBtn
          className={clsx({
            active: pageView === "list",
          })}
          onClick={() => onChangePageView("list")}
          size="large"
        >
          <ListIcon />
        </IconBtn>
      </Box>
    </Box>
  );
};

export default ViewSelectButtons;
