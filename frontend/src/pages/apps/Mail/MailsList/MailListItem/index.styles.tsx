import { alpha, Theme } from "@mui/material";
import { Fonts } from "shared/constants/AppEnums";

import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";

export const MailItemWrapper = styled(ListItem)((props) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottom: `1px solid ${props.theme.palette.divider}`,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    [props.theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
    [props.theme.breakpoints.up("xl")]: {
      paddingTop: 6,
      paddingBottom: 6,
    },
    "&:hover": {
      "& .main-action-wrapper": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .mail-time": {
        opacity: 0,
        visibility: "hidden",
      },
      "& .mail-info-content": {
        width: "calc(100% - 170px)",
      },
    },
    "&.active": {
      backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.1),
      boxShadow: (theme: Theme) =>
        `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
    "& .avatar": {
      width: 36,
      height: 36,
    },
  };
});

export const MailInfoWrapper = styled("div")(({ theme }) => {
  return {
    width: "100%",
    padding: "5px 0 8px 15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 262px)",
      padding: 0,
      paddingLeft: 16,
    },
    "& .fontBold": {
      fontWeight: Fonts.MEDIUM,
    },
  };
});

export const MainActionWrapper = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: -30,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    transition: "all 0.4s ease",
    opacity: 0,
    visibility: "hidden",
    "& .MuiButtonBase-root": {
      padding: 9,
    },
  };
});
