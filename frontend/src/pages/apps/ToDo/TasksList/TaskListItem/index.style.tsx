import { alpha, Box, ListItem } from "@mui/material";

import { styled } from "@mui/material/styles";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "4px 20px 4px 10px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  flexDirection: "row",
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  "&.checked": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
  },
  "& .labelIcon": {
    transform: "translateX(60px)",
    transition: "all 0.5s ease",
    display: "flex",
    alignItems: "center",
  },
  "& .labelAction": {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.disabled,
    transition: "all 0.5s ease",
    transform: "translateX(80px)",
    opacity: 0,
    visibility: "hidden",
    "& .MuiSvgIcon-root": {
      marginLeft: 10,
    },
  },
  "&:hover": {
    "& .labelIcon": {
      transform: "translateX(0px)",
      opacity: 0,
      visibility: "hidden",
    },
    "& .labelAction": {
      transform: "translateX(0px)",
      opacity: 1,
      visibility: "visible",
    },
    "& .task-list-schedule": {
      transform: "translateX(0px)",
    },
  },
}));

export const TaskInfoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "90%",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
}));

export const ActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: 16,
  width: "100%",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "flex-end",
  pl: { sm: 3 },
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
}));
