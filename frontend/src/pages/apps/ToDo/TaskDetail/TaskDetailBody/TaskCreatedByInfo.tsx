import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import { Fonts } from "shared/constants/AppEnums";

interface TaskCreatedByInfoProps {
  createdBy: {
    name: string;
    image?: string;
  };
  createdOn: string;
}

const TaskCreatedByInfo: React.FC<TaskCreatedByInfoProps> = ({
  createdBy,
  createdOn,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {createdBy.image ? (
        <Avatar
          src={createdBy.image}
          sx={{
            height: 36,
            width: 36,
          }}
        />
      ) : (
        <Avatar
          sx={{
            height: 36,
            width: 36,
          }}
        >
          {createdBy.name[0]}
        </Avatar>
      )}
      <Box
        sx={{
          ml: 3.5,
          fontSize: 14,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
        }}
      >
        <Box
          component="span"
          sx={{
            mr: 1,
            fontWeight: Fonts.MEDIUM,
            display: "inline-block",
          }}
        >
          {createdBy.name}
        </Box>
        <Box component="p" mb={0}>
          <Box component="span">
            <IntlMessages id="todo.createdThisTask" />
          </Box>
          <Box component="span" color="text.secondary" ml={1}>
            on {createdOn}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCreatedByInfo;
