import React from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Hidden from "@mui/material/Hidden";
import { IconButton } from "@mui/material";
import { CheckedListObj } from "types/models/apps/ScrumbBoard";
import { styled } from "@mui/material/styles";

const CheckedItemWrapper = styled("div")(() => {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    "& .icon-btn": {
      transition: "all 0.4s ease",
      opacity: 0,
      visibility: "hidden",
    },
    "&:hover": {
      "& .icon-btn": {
        opacity: 1,
        visibility: "visible",
      },
    },
  };
});

interface CardAttachmentsProps {
  onAddNewCheckedItem: () => void;
  checkedList: CheckedListObj[];
  onSetCheckedItemText: (value: string, id: number) => void;
  onDeleteCheckedItem: (id: number) => void;
}

const CardCheckedList: React.FC<CardAttachmentsProps> = ({
  onAddNewCheckedItem,
  checkedList,
  onSetCheckedItemText,
  onDeleteCheckedItem,
}) => {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box component="h4">
          <IntlMessages id="scrumboard.checkedLists" />
        </Box>
        <Box
          sx={{
            ml: "auto",
            pl: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              px: 4,
            }}
            onClick={() => onAddNewCheckedItem()}
          >
            <IntlMessages id="scrumboard.addNew" />
          </Button>
        </Box>
      </Box>

      {checkedList.map((checkedItem) => {
        return (
          <CheckedItemWrapper key={checkedItem.id}>
            <Box
              sx={{
                mb: 4,
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Hidden xsDown>
                <Checkbox
                  sx={{
                    mr: 2,
                  }}
                />
              </Hidden>
              <TextField
                sx={{
                  width: "100%",
                  "& .inputprops-root": {
                    width: "100%",
                    margin: "auto",
                  },
                }}
                variant="outlined"
                InputProps={{
                  className: "inputprops-root",
                }}
                value={checkedItem.title}
                onChange={(e) =>
                  onSetCheckedItemText(e.target.value, checkedItem.id)
                }
              />
            </Box>
            <Box
              component="span"
              sx={{
                mb: 4,
                ml: 3,
              }}
            >
              <IconButton
                className="icon-btn"
                onClick={() => onDeleteCheckedItem(checkedItem.id)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          </CheckedItemWrapper>
        );
      })}
    </Box>
  );
};

export default CardCheckedList;
