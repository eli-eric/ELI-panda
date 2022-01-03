import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { TaskListData } from "types/models/dashboards/Widgets";

interface TaskItemPorps {
  item: TaskListData;
}

const TaskItem: React.FC<TaskItemPorps> = ({ item }) => {
  return (
    <ListItem
      key={item.id}
      sx={{
        padding: "8px 20px",
      }}
      className="item-hover"
    >
      <ListItemText
        primary={
          <Box
            component="p"
            sx={{
              color: "primary.main",
              fontWeight: Fonts.MEDIUM,
              fontSize: 14,
            }}
          >
            {item.title}
          </Box>
        }
        secondary={
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            {item.desc}
          </Box>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
