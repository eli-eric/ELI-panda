import React from "react";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import { PriorityObj } from "types/models/apps/Todo";

interface PriorityProps {
  priority: PriorityObj;
}

const Priority: React.FC<PriorityProps> = ({ priority }) => {
  return (
    <Box
      component="span"
      px={3}
      py={1}
      color={priority.color}
      borderRadius={"30px"}
      fontSize={12}
      display="inline-block"
      bgcolor={alpha(priority.color, 0.1)}
    >
      {priority.name}
    </Box>
  );
};

export default Priority;
