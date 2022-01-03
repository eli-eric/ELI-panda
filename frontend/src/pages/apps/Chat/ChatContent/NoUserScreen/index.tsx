import React from "react";
import { Typography } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const NoUserScreen = () => {
  return (
    <div>
      <ChatBubbleOutlineIcon />
      <Typography>
        <IntlMessages id="chatApp.noUser" />
      </Typography>
    </div>
  );
};

export default NoUserScreen;
