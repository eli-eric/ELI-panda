import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { AppState } from "../../../../../redux/store";
import { ContactObj } from "../../../../../types/models/apps/Contact";

interface CheckBoxProps {
  checkedContacts: number[];
  setCheckedContacts: (contactIds: number[]) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checkedContacts,
  setCheckedContacts,
}) => {
  const { contactList }: { contactList: ContactObj[] } = useSelector<
    AppState,
    AppState["contactApp"]
  >(({ contactApp }) => contactApp);

  const onHandleMasterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const contactIds = contactList.map((contact) => contact.id);
      setCheckedContacts(contactIds);
    } else {
      setCheckedContacts([]);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Checkbox
        sx={{
          color: (theme) => theme.palette.text.disabled,
        }}
        color="primary"
        indeterminate={
          checkedContacts.length > 0 &&
          checkedContacts.length < contactList.length
        }
        checked={
          contactList.length > 0 &&
          checkedContacts.length === contactList.length
        }
        onChange={onHandleMasterCheckbox}
      />
    </Box>
  );
};

export default CheckBox;
