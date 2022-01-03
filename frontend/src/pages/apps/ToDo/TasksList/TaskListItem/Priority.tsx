import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "shared/constants/AppEnums";
import { alpha } from "@mui/material";
import { PriorityObj } from "types/models/apps/Todo";

interface PriorityProps {
  priority: PriorityObj;
}

const Priority: React.FC<PriorityProps> = ({ priority }) => {
  return (
    <Box
      component="span"
      sx={{
        px: 3,
        py: 1,
        color: priority.color,
        borderRadius: "30px",
        fontSize: 12,
        fontWeight: Fonts.SEMI_BOLD,
        bgcolor: alpha(priority.color, 0.1),
      }}
    >
      {priority.name}
    </Box>
  );
};

export default Priority;
