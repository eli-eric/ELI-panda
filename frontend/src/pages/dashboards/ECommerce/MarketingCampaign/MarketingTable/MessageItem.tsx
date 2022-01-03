import React from "react";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { Fonts } from "../../../../../shared/constants/AppEnums";

interface MessageItemProp {
  item: {
    image: string;
    name: string;
    message: string;
  };
  listStyle: Object;
}

const MessageItem: React.FC<MessageItemProp> = (props) => {
  const { item, listStyle } = props;
  return (
    <ListItem
      sx={{
        display: "flex",
        padding: "0px 0px 4px",
        "&:last-of-type": {
          paddingBottom: 0,
        },
      }}
      className={`${listStyle}`}
    >
      <Box
        sx={{
          mr: 4,
        }}
      >
        <ListItemAvatar
          sx={{
            minWidth: 10,
          }}
        >
          <Avatar
            sx={{
              width: { xs: 40, xl: 60 },
              height: { xs: 40, xl: 60 },
            }}
            src={item.image}
          />
        </ListItemAvatar>
      </Box>
      <Box
        sx={{
          fontSize: { xs: 16, xl: 18 },
        }}
      >
        <Box
          component="span"
          sx={{
            fontWeight: Fonts.LIGHT,
            display: "block",
            fontSize: { xs: 16, xl: 18 },
          }}
        >
          {item.name}
        </Box>
        <Box
          component="span"
          sx={{
            color: "text.secondary",
            display: "block",
          }}
        >
          {item.message}
        </Box>
      </Box>
    </ListItem>
  );
};

export default MessageItem;
