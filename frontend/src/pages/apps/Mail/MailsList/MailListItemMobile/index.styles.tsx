import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";

export const MailMobileItemWrapper = styled(ListItem)((props) => {
  return {
    display: "flex",
    alignItems: "flex-start",
    borderBottom: `1px solid ${props.theme.palette.divider}`,
    paddingTop: 6,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    "&.active": {
      backgroundColor: alpha(props.theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(props.theme.palette.common.black, 0.08)}`,
    },
  };
});

export const AvatarWrapper = styled("div")(({ theme }) => {
  return {
    "& .avatar": {
      width: 36,
      height: 36,
    },
    "&.checked": {
      width: 36,
      height: 36,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
  };
});

export const AttachmentWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    border: `solid 1px ${theme.palette.divider}`,
    borderRadius: 30,
    padding: "5px 12px",
    display: "inline-block",
    marginRight: 10,
    color: theme.palette.text.secondary,
    marginTop: 5,
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      display: "block",
    },
  };
});
