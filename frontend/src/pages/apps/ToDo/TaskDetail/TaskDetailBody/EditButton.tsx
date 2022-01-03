import React from "react";
import IconButton from "@mui/material/IconButton";

interface EditButtonProps {
  action: (event: React.MouseEvent<HTMLElement>) => void;
  title: any;
}

const EditButton: React.FC<EditButtonProps> = ({ action, title }) => {
  return (
    <IconButton color="primary" onClick={action} size="large">
      {title}
    </IconButton>
  );
};

export default EditButton;
