import React from "react";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { useDispatch } from "react-redux";
import { onSelectUser } from "../../../../../../redux/actions";
import clsx from "clsx";
import { alpha } from "@mui/material";
import { ConnectionObj } from "types/models/apps/Chat";

interface ConnectionItemProps {
  item: ConnectionObj;
  selectedUser: ConnectionObj;
  listStyle: string;
}

const ContactItem: React.FC<ConnectionItemProps> = ({
  item,
  selectedUser,
  listStyle,
}) => {
  const dispatch = useDispatch();

  return (
    <ListItem
      sx={{
        display: "flex",
        pl: 5,
        pr: 5,
        cursor: "pointer",
        "&.active": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.07),
        },
      }}
      button
      className={clsx("item-hover", {
        active: selectedUser && selectedUser.id === item.id,
      })}
      onClick={() => dispatch(onSelectUser(item))}
    >
      <div>
        <ListItemAvatar
          sx={{
            minWidth: 0,
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
            }}
            src={item.image}
          />
        </ListItemAvatar>
      </div>
      <Box
        sx={{
          fontSize: 14,
          pl: 3.5,
          width: "calc(100% - 36px)",
        }}
      >
        <Box
          component="h5"
          sx={{
            display: "block",
            mb: 0.5,
          }}
        >
          {item.name}
        </Box>
        <Box
          component="p"
          sx={{
            color: "text.secondary",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          @{item.username}
        </Box>
      </Box>
    </ListItem>
  );
};

export default ContactItem;
