import React from "react";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import { IconButton } from "@mui/material";
import { ContactObj } from "../../../../types/models/apps/Contact";

interface ContactActionsProps {
  contact: ContactObj | null;
  onDeleteContact: () => void;
  onChangeStarred: (checked: boolean, item: any) => void;
  onOpenEditContact: (contact: ContactObj | null) => void;
}

const ContactActions: React.FC<ContactActionsProps> = ({
  onDeleteContact,
  onChangeStarred,
  onOpenEditContact,
  contact,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          transition: "all 0.5s ease",
          opacity: 0,
          visibility: "hidden",
        }}
        className="btn-action-view"
      >
        <IconButton
          onClick={onDeleteContact}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            "& svg": {
              fontSize: 20,
            },
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => onOpenEditContact(contact)}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            "& svg": {
              fontSize: 20,
            },
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Box>
      <AppsStarredIcon item={contact} onChange={onChangeStarred} />
    </Box>
  );
};

export default ContactActions;
