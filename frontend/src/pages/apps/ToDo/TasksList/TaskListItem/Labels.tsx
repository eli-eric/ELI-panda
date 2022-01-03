import React from "react";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import Box from "@mui/material/Box";
import AppTooltip from "@crema/core/AppTooltip";

import { LabelObj } from "types/models/apps/Todo";

interface LabelsProps {
  labels: LabelObj[];
}

const Labels: React.FC<LabelsProps> = ({ labels }) => {
  return (
    <Box
      className="labelIcon"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {labels.map((label) => {
        return (
          <AppTooltip title={label.name} placement="top" key={label.id}>
            <LabelOutlinedIcon
              sx={{
                color: `${label.color}`,
                marginRight: 2.5,
                display: "block",
              }}
            />
          </AppTooltip>
        );
      })}
    </Box>
  );
};

export default Labels;
