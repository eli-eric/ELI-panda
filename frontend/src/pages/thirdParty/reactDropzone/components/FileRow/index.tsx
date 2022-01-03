import React from "react";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FileRowProps {
  file?: any;
  onDeleteUploadFile: (file: any) => void;
}

const FileRow: React.FC<FileRowProps> = ({ file, onDeleteUploadFile }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        mb: 2.5,
        borderRadius: 2.5,
        p: 2.5,
      }}
    >
      <Box sx={{ mr: 3 }}>
        <InsertDriveFileIcon />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography>{file.path}</Typography>
        <Box
          component="span"
          sx={{
            color: "text.secondary",
          }}
        >
          {file.size} bytes
        </Box>
      </Box>
      <IconButton
        sx={{
          padding: 1.5,
          fontSize: 16,
        }}
        onClick={() => onDeleteUploadFile(file)}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};

export default FileRow;
