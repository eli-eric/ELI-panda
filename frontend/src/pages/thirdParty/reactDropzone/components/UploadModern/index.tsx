import React from "react";
import Box from "@mui/material/Box";
import { TiFolderOpen } from "react-icons/ti";
import { useThemeContext } from "../../../../../@crema/utility/AppContextProvider/ThemeContextProvider";

interface UploadModernProps {
  uploadText: string;
  dropzone: any;
}

const UploadModern: React.FC<UploadModernProps> = ({
  uploadText,
  dropzone,
}) => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        position: "relative",
        "& ul": {
          listStyle: "none",
          padding: 0,
        },
      }}
    >
      <Box
        {...dropzone.getRootProps({ className: "dropzone" })}
        sx={{
          cursor: "pointer",
          border: (theme) => `dashed 2px ${theme.palette.divider}`,
          borderRadius: 2.5,
          p: 5,
          textAlign: "center",
          mb: 4,
          color: "text.secondary",
          backgroundColor: "background.default",
        }}
      >
        <input {...dropzone.getInputProps()} />
        <TiFolderOpen
          style={{
            fontSize: 40,
            marginBottom: 4,
            color: theme.palette.primary.main,
          }}
        />
        <p>{uploadText}</p>
      </Box>
    </Box>
  );
};

export default UploadModern;
