import React from "react";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { useDispatch } from "react-redux";
import { onSelectUser } from "../../../../../../redux/actions";
import clsx from "clsx";
import { ConnectionObj } from "types/models/apps/Chat";
import { green, red } from "@mui/material/colors";
import { alpha } from "@mui/material";

interface ChatItemProps {
  item: ConnectionObj;
  selectedUser: ConnectionObj;
}

const ChatItem: React.FC<ChatItemProps> = ({ item, selectedUser }) => {
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
          <>
            <Avatar
              sx={{
                width: 40,
                height: 40,
              }}
              src={item.image}
            />
            {item?.isGroup ? (
              <Box
                sx={{
                  position: "absolute",
                  right: -2,
                  bottom: -2,
                  zIndex: 1,
                  borderRadius: "50%",
                  border: `1.5px solid white`,
                }}
              >
                <Avatar
                  sx={{ height: 12, width: 12 }}
                  src={item.members![0].image}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  right: -2,
                  bottom: -2,
                  zIndex: 1,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: `1.5px solid white`,
                  backgroundColor:
                    item.status === "online" ? green[600] : red[600],
                }}
              />
            )}
          </>
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
          {item.lastMessage!.message}
        </Box>
      </Box>
    </ListItem>
  );
};

export default ChatItem;
