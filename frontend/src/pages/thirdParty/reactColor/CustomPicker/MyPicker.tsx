import React from "react";

import { CustomPicker } from "react-color";
import { EditableInput, Hue } from "react-color/lib/components/common";
import { Box } from "@mui/material";

interface MyPickerProps {
  onChange: (color: any) => void;
  color: string;

  [x: string]: any;
}

export const MyPicker: React.FC<MyPickerProps> = ({ color, onChange }) => {
  return (
    <Box
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.01) 0px 2px 10px, rgba(0, 0, 0, 0.1) 0px 2px 5px",
        p: 4,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          height: 10,
          position: "relative",
          marginBottom: 10,
        }}
      >
        <Hue color={color} onChange={onChange} />
      </Box>

      <Box sx={{ display: "flex" }}>
        <EditableInput
          style={{
            input: {
              height: 38,
              border: `1px solid ${color}`,
              paddingLeft: 10,
            },
          }}
          value={color}
          onChange={onChange}
        />
        <Box
          sx={{
            width: 40,
            height: 38,
            background: color,
          }}
        />
      </Box>
    </Box>
  );
};

export default CustomPicker(MyPicker);
