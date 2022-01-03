import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Box } from "@mui/material";

const Basic = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.rgb);
  };

  const background = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  return (
    <div>
      <div onClick={handleClick}>
        <Box
          sx={{
            backgroundColor: background,
            width: 36,
            height: 14,
            borderRadius: 2,
          }}
        />
      </div>
      {displayColorPicker ? (
        <div>
          <Box onClick={handleClose} />
          <SketchPicker onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default Basic;
