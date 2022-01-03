import React from "react";
import { Box, CardMedia } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { StoriesData } from "types/models/apps/Wall";
import { styled } from "@mui/material/styles";

const UserInfoContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  padding: "30px 10px 16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: theme.palette.common.white,
  "&:before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(180deg, rgba(120, 130, 146, 0) 7.29%, #788292 100%)",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    opacity: 0.65,
  },
  "& > *": {
    position: "relative",
    zIndex: 3,
  },
}));

interface StoriesProps {
  data: StoriesData;
}

const StoriesItem: React.FC<StoriesProps> = ({ data }) => {
  const { imgSrc, avatar, title } = data;
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          minHeight: 160,
          borderRadius: 1,
        }}
        src={imgSrc}
        alt="Stories 1"
      />
      <UserInfoContainer>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            border: `solid 2px primary.main`,
            backgroundColor: "background.paper",
            padding: 0.5,
            marginBottom: 1.25,
            "& .MuiAvatar-img": {
              borderRadius: "50%",
            },
          }}
          src={avatar}
          alt="Avatar"
        />
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </UserInfoContainer>
    </Box>
  );
};

export default StoriesItem;
