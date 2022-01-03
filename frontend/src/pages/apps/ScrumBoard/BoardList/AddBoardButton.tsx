import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

import IntlMessages from "@crema/utility/IntlMessages";
import Grid from "@mui/material/Grid";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { grey } from "@mui/material/colors";

interface AddBoardButtonProps {
  onAddButtonClick: () => void;
}

const AddBoardButton: React.FC<AddBoardButtonProps> = ({
  onAddButtonClick,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius: 16,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.background.paper,
          height: 224,
          border: "2px dashed",
          borderColor: grey[600],
        }}
        onClick={() => onAddButtonClick()}
      >
        <Avatar
          sx={{
            backgroundColor: "grey.500",
            marginBottom: 5,
          }}
        >
          <AddIcon
            sx={{
              fontSize: 24,
            }}
          />
        </Avatar>
        <Box
          component="p"
          sx={{
            fontWeight: Fonts.MEDIUM,
            fontSize: 14,
          }}
        >
          <IntlMessages id="scrumboard.addNewBoard" />
        </Box>
      </Card>
    </Grid>
  );
};

export default AddBoardButton;
