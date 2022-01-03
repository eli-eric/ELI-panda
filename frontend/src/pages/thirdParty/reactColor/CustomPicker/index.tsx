import React, { useState } from "react";

import MyPicker from "./MyPicker";

export const CustomPicker = () => {
  const [color, setColor] = useState<string>("orange");
  const handleColorChange = ({ hex }: { hex: any }) => setColor(hex);

  return (
    <MyPicker
      color={color}
      onChangeComplete={handleColorChange}
      onChange={() => {}}
    />
  );
};

export default CustomPicker;
