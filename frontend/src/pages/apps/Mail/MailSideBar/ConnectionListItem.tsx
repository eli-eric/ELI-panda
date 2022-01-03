import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/material";
import { Fonts } from "shared/constants/AppEnums";
import { ConnectionObj } from "types/models/apps/Mail";
import { styled } from "@mui/material/styles";

const ListItemTextWrapper = styled(ListItemText)(() => {
  return {
    marginTop: 0,
    marginBottom: 0,
    "& .MuiTypography-body1": {
      fontSize: 14,
      lineHeight: 1.1,
    },
    "& .MuiListItemText-secondary": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };
});

interface ConnectionListItemProps {
  connection: ConnectionObj;
}

const ConnectionListItem: React.FC<ConnectionListItemProps> = ({
  connection,
}) => {
  return (
    <>
      <ListItem
        key={connection.id}
        sx={{
          px: 0,
          cursor: "pointer",
        }}
        alignItems="flex-start"
      >
        <ListItemAvatar
          sx={{
            mt: 0,
            minWidth: 10,
            mr: 3.5,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
            alt={connection.name}
            src={connection.image}
          />
        </ListItemAvatar>
        <ListItemTextWrapper
          primary={
            <Box
              component="span"
              sx={{
                mb: 0,
                fontWeight: Fonts.MEDIUM,
              }}
            >
              {connection.name}
            </Box>
          }
          secondary={connection.status}
        />
      </ListItem>
    </>
  );
};

export default ConnectionListItem;
