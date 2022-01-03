import React from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import IntlMessages from "@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import { SuggestTeamData } from "types/models/apps/Wall";

interface SuggestionsProps {
  data: SuggestTeamData;
}

const SuggestTeam: React.FC<SuggestionsProps> = ({ data }) => {
  const { icon, title, subTitle, mediaImg } = data;
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      contentStyle={{
        p: 0,
        "&:last-of-type": {
          pb: 0,
        },
      }}
      title={messages["wall.suggestTeams"]}
      action={messages["common.viewAll"]}
      footer={
        <Button
          sx={{
            width: "100%",
            height: 46,
            borderRadius: 0,
          }}
          color="primary"
          startIcon={<ThumbUpAltOutlinedIcon />}
        >
          <IntlMessages id="wall.likeTeam" />
        </Button>
      }
      footerStyle={{ padding: 0 }}
    >
      <Box px={5} pt={3} pb={4} display="flex" alignItems="center">
        <Avatar src={icon} alt="Face Book" />
        <Box ml={3.5}>
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
          <Box component="p" color="text.secondary">
            {subTitle}
          </Box>
        </Box>
      </Box>
      <CardMedia
        sx={{
          height: 180,
          width: "100%",
        }}
        image={mediaImg}
      />
    </AppCard>
  );
};

export default SuggestTeam;
