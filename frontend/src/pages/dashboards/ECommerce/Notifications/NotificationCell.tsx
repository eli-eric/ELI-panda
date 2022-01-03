import React from "react";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { NotificationsData } from "types/models/dashboards/Ecommerce";

interface NotificationCellProps {
  item: NotificationsData;
}

const NotificationCell: React.FC<NotificationCellProps> = ({ item }) => {
  return (
    <ListItem
      disableGutters
      className="item-hover"
      sx={{ paddingLeft: 5, paddingRight: 5 }}
    >
      <ListItemAvatar
        sx={{
          minWidth: "auto",
          mr: 4,
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
          }}
          src={item.image}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box
            component="span"
            sx={{
              color: "text.primary",
              mb: 0.5,
              fontWeight: Fonts.MEDIUM,
              fontSize: 14,
            }}
          >
            {item.type}
          </Box>
        }
        secondary={
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: 14,
              color: "primary.main",
            }}
          >
            {" "}
            <Box
              component="span"
              sx={{
                display: "block",
                mr: 2,
              }}
            >
              {item.name}
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                color: "text.secondary",
              }}
            >
              {item.message}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export default NotificationCell;
