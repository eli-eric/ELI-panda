import React from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import { Fonts } from "shared/constants/AppEnums";
import TextField from "@mui/material/TextField";
import { ContactObj } from "types/models/apps/Contact";

interface NotesProps {
  contact: ContactObj;
}

const Notes: React.FC<NotesProps> = ({ contact }) => {
  const { messages } = useIntl();

  return (
    <Box
      sx={{
        pr: { xs: 5, lg: 8, xl: 10 },
        py: 5,
      }}
    >
      <Box
        component="h6"
        sx={{
          m: 2,
          fontWeight: Fonts.MEDIUM,
          fontSize: 16,
        }}
      >
        <IntlMessages id="common.notes" />
      </Box>

      <TextField
        multiline
        sx={{
          width: "100%",
        }}
        rows="4"
        placeholder={messages["common.notes"] as string}
        name="notes"
        value={contact.notes}
        variant="outlined"
        disabled
      />
    </Box>
  );
};

export default Notes;
