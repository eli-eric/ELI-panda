import React from "react";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import clsx from "clsx";
import { FaqFolderData } from "./index";

interface SideBarItemProps {
  item: FaqFolderData;
  onGetFaqData: (num: number) => void;
  selectionId: number;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  item,
  onGetFaqData,
  selectionId,
}) => {
  return (
    <ListItem
      button
      className={clsx("listItem", {
        active: item.id === selectionId,
      })}
      onClick={() => onGetFaqData(item.id)}
    >
      <Box sx={{ mr: 3, color: "text.primary" }}>
        <ListItemIcon
          sx={{
            minWidth: 10,
          }}
        >
          {item.icon}
        </ListItemIcon>
      </Box>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

export default SideBarItem;
