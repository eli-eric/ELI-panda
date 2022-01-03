import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { RecentNewsObj } from "../../../../types/models/apps/Wall";

interface RecentNewsProps {
  item: RecentNewsObj;
}

const NewsItem: React.FC<RecentNewsProps> = ({ item }) => {
  return (
    <Box className="item-hover" display="flex" px={5} py={2}>
      <Avatar
        sx={{
          width: 36,
          height: 36,
        }}
        src={item.user.profilePic}
      />
      <Box ml={3.5}>
        <Box component="h5" mb={0.5}>
          {item.title}
        </Box>
        <Box component="p" color="text.secondary">
          {item.desc}
          <Box
            ml={2}
            component="span"
            fontSize={13}
            color="primary.main"
            className="pointer"
          >
            Read More
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsItem;
