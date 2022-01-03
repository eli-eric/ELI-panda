import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { timeFromNow } from "@crema/utility/helper/DateHelper";
import Typography from "@mui/material/Typography";
import { FriendRequestObj } from "types/models/apps/Wall";

interface RequestItemProps {
  request: FriendRequestObj;
}

const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  return (
    <Box
      className="item-hover"
      sx={{
        display: "flex",
        alignItems: "center",
        px: 5,
        py: 2,
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
        }}
        src={request.profilePic}
      />
      <Box
        sx={{
          ml: 3.5,
          flex: 1,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        <Box flex={1} mr={1}>
          <Typography
            sx={{
              marginBottom: 1,
              whiteSpace: "nowrap",
            }}
            component="h5"
            variant="h5"
          >
            {request.name}
          </Typography>
        </Box>
        <Box component="p" color="text.secondary" mb={1}>
          {timeFromNow(request.date)}
        </Box>
      </Box>
    </Box>
  );
};

export default RequestItem;
