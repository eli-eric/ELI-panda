import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onUpdateSelectedContact } from "../../../../redux/actions/ContactApp";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ContactActions from "./ContactActions";
import PersonalDetails from "./PersonalDetails";
import OtherDetails from "./OtherDetails";
import AppDialog from "@crema/core/AppDialog";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import { ContactObj } from "../../../../types/models/apps/Contact";

interface ContactDetailProps {
  isShowDetail: boolean;
  selectedContact: ContactObj | null;
  onShowDetail: (show: boolean) => void;
  onSelectContactsForDelete: (ids: number[]) => void;
  onOpenEditContact: (contact: ContactObj | null) => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  isShowDetail,
  selectedContact,
  onShowDetail,
  onSelectContactsForDelete,
  onOpenEditContact,
}) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState<ContactObj | null>(selectedContact);

  useEffect(() => {
    setContact(selectedContact);
  }, [selectedContact]);

  const onChangeStarred = (checked: boolean) => {
    const updatedContact = contact;
    contact!.isStarred = checked;
    setContact(updatedContact);
    dispatch(onUpdateSelectedContact(contact as ContactObj));
  };

  const onDeleteContact = () => {
    onSelectContactsForDelete([contact!.id]);
    onShowDetail(false);
  };

  return (
    <>
      <AppDialog
        actionTitle=""
        sxStyle={{
          "& .MuiPaper-root:hover": {
            "& .btn-action-view": {
              opacity: 1,
              visibility: "visible",
            },
          },
        }}
        onClose={() => onShowDetail(false)}
        hideClose
        open={isShowDetail}
        title={
          <ContactActions
            onChangeStarred={onChangeStarred}
            onDeleteContact={onDeleteContact}
            onOpenEditContact={onOpenEditContact}
            contact={contact}
          />
        }
      >
        {contact ? (
          <div>
            <Box
              sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                ml: -6,
                mr: -6,
                pl: 5,
                pr: 5,
                pb: 4,
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {contact.image ? (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                    src={contact.image}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                  >
                    {contact.name[0].toUpperCase()}
                  </Avatar>
                )}
                <Box component="h3">{contact.name}</Box>
              </Box>
            </Box>

            <Box
              sx={{
                pt: 5,
              }}
            >
              <AppGridContainer>
                <Grid item xs={12} md={6}>
                  <PersonalDetails contact={contact} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <OtherDetails contact={contact} />
                </Grid>
              </AppGridContainer>
            </Box>
          </div>
        ) : (
          <div />
        )}
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            sx={{ width: 100 }}
            onClick={() => onShowDetail(false)}
          >
            Close
          </Button>
        </DialogActions>
      </AppDialog>
    </>
  );
};

export default ContactDetail;
