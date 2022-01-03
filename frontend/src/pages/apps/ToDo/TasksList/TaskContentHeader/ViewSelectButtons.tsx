import React from "react";
import IconButton from "@mui/material/IconButton";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import clsx from "clsx";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { ViewMode } from "../index";

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
  onViewModeSelect: (str: string) => void;
  viewMode: string;
}

const ViewSelectButtons: React.FC<ViewSelectButtonsProps> = ({
  viewMode,
  onViewModeSelect,
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
            active: viewMode === ViewMode.List,
          })}
          onClick={() => onViewModeSelect(ViewMode.List)}
          size="large"
        >
          <ListIcon />
        </IconBtn>
      </Box>
      <Box
        sx={{
          ml: 3.5,
        }}
      >
        <IconBtn
          className={clsx({
            active: viewMode === ViewMode.Calendar,
          })}
          onClick={() => onViewModeSelect(ViewMode.Calendar)}
          size="large"
        >
          <DateRangeOutlinedIcon />
        </IconBtn>
      </Box>
    </Box>
  );
};

export default ViewSelectButtons;
