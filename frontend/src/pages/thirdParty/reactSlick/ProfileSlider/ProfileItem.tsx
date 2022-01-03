import React from "react";
import Avatar from "@mui/material/Avatar";
import { alpha, Box } from "@mui/material";

import { styled } from "@mui/material/styles";
import { ProfileSlide } from "../../../../@crema/services/db/thirdParty/reactSlick";

const ProfilePic = styled("div")(({ theme }) => {
  return {
    position: "relative",
    border: `solid 2px ${alpha(theme.palette.primary.main, 0.7)}`,
    padding: 4,
    borderRadius: "50%",
    marginBottom: 10,
    marginTop: 10,
    "& .avatar-pic": {
      height: 84,
      width: 84,
    },
  };
});

interface ProfileItemProps {
  profile: ProfileSlide;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProfilePic>
        <Avatar className="avatar-pic" src={profile.srcImg} />
      </ProfilePic>
      <Box sx={{ mb: 0.5 }} component="h5">
        {profile.name}
      </Box>
      <Box
        sx={{
          mb: 4,
          fontSize: 12,
          color: "text.secondary",
        }}
      >
        {profile.designation}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              py: 3.5,
              px: 2,
              width: 1 / 2,
              borderRight: (theme) => `solid 1px ${theme.palette.grey[200]}`,
            }}
          >
            <Box component="h5">{profile.years}</Box>
            <Box component="p" color="text.secondary">
              Years
            </Box>
          </Box>
          <Box
            sx={{
              py: 3.5,
              px: 2,
              width: 1 / 2,
            }}
          >
            <Box component="h5">{profile.blood}</Box>
            <Box component="p" sx={{ color: "text.secondary" }}>
              Blood
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            borderTop: (theme) => `solid 1px ${theme.palette.grey[200]}`,
          }}
        >
          <Box
            sx={{
              py: 3.5,
              px: 2,
              width: 1 / 2,
              borderRight: (theme) => `solid 1px ${theme.palette.grey[200]}`,
            }}
          >
            <Box component="h5">{profile.height} cm</Box>
            <Box component="p" sx={{ color: "text.secondary" }}>
              Height
            </Box>
          </Box>
          <Box
            sx={{
              py: 3.5,
              px: 2,
              width: 1 / 2,
            }}
          >
            <Box component="h5">{profile.weight} kg</Box>
            <Box component="p" sx={{ color: "text.secondary" }}>
              Weight
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileItem;
