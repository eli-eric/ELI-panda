import React from "react";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import IntlMessages from "@crema/utility/IntlMessages";

interface NewListButtonProps {
  onClick: () => void;
}

const NewListButton: React.FC<NewListButtonProps> = ({ onClick }) => {
  return (
    <Box
      sx={{
        m: 1.25,
        p: 2.5,
        width: 350,
        backgroundColor: "background.default",
        borderRadius: 4,
      }}
    >
      <Card
        sx={{
          py: 2,
          px: 6,
          minHeight: 56,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              cursor: "pointer",
              backgroundColor: "grey.100",
              border: `1px dashed ${grey[400]}`,
            }}
            onClick={onClick}
          >
            <AddIcon
              sx={{
                color: "grey.500",
                fontWeight: Fonts.LIGHT,
              }}
            />
          </Avatar>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                ml: 3.5,
                fontWeight: Fonts.MEDIUM,
                fontSize: 15,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <IntlMessages id="scrumboard.addAList" />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default NewListButton;
