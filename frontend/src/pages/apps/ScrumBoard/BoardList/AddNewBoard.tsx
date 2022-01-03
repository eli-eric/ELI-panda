import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import IntlMessages from "@crema/utility/IntlMessages";
import { Fonts } from "../../../../shared/constants/AppEnums";
import Box from "@mui/material/Box";
import { BoardObj } from "types/models/apps/ScrumbBoard";

interface AddNewBoardProps {
  isAddBoardOpen: boolean;
  onCloseAddBoardModal: () => void;
  onAddBoard: (boardName: string) => void;
  selectedBoard: BoardObj | null;
}

const AddNewBoard: React.FC<AddNewBoardProps> = ({
  isAddBoardOpen,
  onCloseAddBoardModal,
  onAddBoard,
  selectedBoard,
}) => {
  const [boardName, setBoardName] = useState(() =>
    selectedBoard ? selectedBoard.name : ""
  );

  const onClickAddButton = () => {
    if (boardName !== "") {
      onAddBoard(boardName);
      setBoardName("");
      onCloseAddBoardModal();
    }
  };

  return (
    <Dialog
      open={isAddBoardOpen}
      onClose={() => onCloseAddBoardModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      sx={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: 600,
          width: "100%",
        },
        "& .MuiTypography-h6": {
          fontWeight: Fonts.LIGHT,
        },
      }}
    >
      <Card
        sx={{
          padding: "32px 40px",
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          label={<IntlMessages id="scrumboard.boardTitle" />}
          value={boardName}
          onChange={(event) => setBoardName(event.target.value)}
        />
        <Box
          sx={{
            mt: 3,
            textAlign: "right",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              paddingRight: 8,
              paddingLeft: 8,
            }}
            onClick={onClickAddButton}
          >
            <IntlMessages id="common.add" />
          </Button>
        </Box>
      </Card>
    </Dialog>
  );
};

export default AddNewBoard;
