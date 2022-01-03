import React from "react";
import Card from "@mui/material/Card";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { IconButton } from "@mui/material";
import { BoardObj } from "types/models/apps/ScrumbBoard";

interface BoardItemProps {
  board: BoardObj;
  onEditButtonClick: (board: BoardObj) => void;
  onViewBoardDetail: (board: BoardObj) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({
  board,
  onEditButtonClick,
  onViewBoardDetail,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={board.id}>
      <Card
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          textAlign: "center",
          height: 224,
        }}
        key={board.id}
        onClick={() => onViewBoardDetail(board)}
      >
        <Box
          sx={{
            marginBottom: 4,
          }}
        >
          <IconButton>
            <ListAltIcon
              sx={{
                fontSize: 24,
                color: "primary.contrastText",
              }}
            />
          </IconButton>
          <IconButton>
            <EditIcon
              sx={{
                fontSize: 24,
                color: "primary.contrastText",
              }}
              onClick={() => onEditButtonClick(board)}
            />
          </IconButton>
        </Box>
        <Box
          component="p"
          sx={{
            mx: 2,
            fontWeight: Fonts.MEDIUM,
            fontSize: 14,
          }}
        >
          {board.name}
        </Box>
        <Box
          component="span"
          onClick={(event: any) => event.stopPropagation()}
        />
      </Card>
    </Grid>
  );
};

export default BoardItem;
