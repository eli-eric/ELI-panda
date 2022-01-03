import React from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IntlMessages from "@crema/utility/IntlMessages";
import { styled } from "@mui/material/styles";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { UserObj } from "types/models/apps/Wall";

const UserInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  marginBottom: 20,
  [theme.breakpoints.up("xl")]: {
    marginBottom: 30,
  },
}));
const UserWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  "& .MuiAvatar-root": {
    border: `solid 5px ${theme.palette.background.paper}`,
    marginBottom: 10,
    width: 84,
    height: 84,
    marginTop: -42,
  },
}));

const UserStatus = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 2,
  bottom: 12,
  zIndex: 1,
  width: 30,
  height: 30,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  border: `solid 3px ${theme.palette.primary.contrastText}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: 14,
  },
}));
const UserAvatar = styled(Avatar)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.contrastText}`,
  marginRight: -4,
  width: 28,
  height: 28,
}));
const AvatarCount = styled("div")(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.contrastText}`,
  width: 28,
  height: 28,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  marginRight: -4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  fontSize: 12,
  fontWeight: Fonts.BOLD,
}));

interface VideoCallProps {
  data: { users: UserObj[]; title: string };
}

const VideoCall: React.FC<VideoCallProps> = ({ data }) => {
  const { users, title } = data;

  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      contentStyle={{
        p: 0,
        "&:last-of-type": {
          pb: 0,
        },
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          width: "100%",
        }}
        image="/assets/images/wall/v-card.jpg"
      />
      <Box px={5} pb={4}>
        <UserInfo>
          <UserWrapper>
            <Avatar src="/assets/images/avatar/A5.jpg" alt="User" />
            <UserStatus>
              <CheckCircleIcon />
            </UserStatus>
          </UserWrapper>
          <Typography component="h3">
            <IntlMessages id="wall.ericBrickey" />
          </Typography>
          <Box component="p" color="text.secondary" mt={1}>
            <IntlMessages id="wall.osloNorway" />
          </Box>
        </UserInfo>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Box mb={2.5} component="h4">
            {title}
          </Box>
          <Box display="flex" alignItems="center" mb={{ xs: 5, xl: 7.5 }}>
            {users.slice(0, 4).map((user) => (
              <UserAvatar key={user.id} src={user.profilePic} />
            ))}
            {users.length > 4 ? (
              <AvatarCount>+{users.length - 4}</AvatarCount>
            ) : null}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Box mx={2} mb={2}>
              <Button
                startIcon={<PhoneOutlinedIcon />}
                color="primary"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                <IntlMessages id="wall.groupCall" />
              </Button>
            </Box>
            <Box mx={2} mb={2}>
              <Button
                startIcon={<VideocamOutlinedIcon />}
                color="primary"
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                <IntlMessages id="wall.videoCall" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default VideoCall;
