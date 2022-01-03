import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IntlMessages from "@crema/utility/IntlMessages";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { Fonts } from "../../../../shared/constants/AppEnums";

interface AddNewTagProps {
  onAddNewTag: (tag: string) => void;
}

const AddNewTag: React.FC<AddNewTagProps> = ({ onAddNewTag }) => {
  const [newTag, setNewTag] = useState("");

  const [isAddNewTag, setAddNewTag] = useState(false);

  const onAddTag = () => {
    onAddNewTag(newTag);
    setNewTag("");
    setAddNewTag(false);
  };

  return (
    <>
      {isAddNewTag ? (
        <Box
          sx={{
            m: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box component="span">
            <TextField
              label={<IntlMessages id="common.tag" />}
              variant="outlined"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </Box>
          <Box
            component="span"
            sx={{
              mx: 3,
            }}
          >
            <CheckIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={onAddTag}
            />
          </Box>
          <CloseIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setAddNewTag(false)}
          />
        </Box>
      ) : (
        <Box
          component="p"
          sx={{
            m: 2,
            ml: 3,
            color: "secondary.main",
            fontSize: { xs: 16, xl: 18 },
            cursor: "pointer",
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={() => setAddNewTag(true)}
        >
          <IntlMessages id="dashboard.addNewTag" />
        </Box>
      )}
    </>
  );
};

export default AddNewTag;
