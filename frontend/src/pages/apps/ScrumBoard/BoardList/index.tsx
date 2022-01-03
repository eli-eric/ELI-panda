import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewBoard,
  onEditBoardDetail,
  onGetBoardList,
} from "../../../../redux/actions";
import { useHistory } from "react-router-dom";
import AddNewBoard from "./AddNewBoard";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import AppGridContainer from "@crema/core/AppGridContainer";
import BoardItem from "./BoardItem";
import AddBoardButton from "./AddBoardButton";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppInfoView from "@crema/core/AppInfoView";
import { AppState } from "../../../../redux/store";
import { BoardObj } from "types/models/apps/ScrumbBoard";

const BoardList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { boardList }: { boardList: BoardObj[] } = useSelector<
    AppState,
    AppState["scrumboardApp"]
  >(({ scrumboardApp }) => scrumboardApp);

  const [isAddBoardOpen, setAddBoardOpen] = useState<boolean>(false);

  const [selectedBoard, setSelectedBoard] = useState<BoardObj | null>(null);

  useEffect(() => {
    dispatch(onGetBoardList());
  }, [dispatch]);

  const onCloseAddBoardModal = () => {
    setAddBoardOpen(false);
  };

  const onAddButtonClick = () => {
    setSelectedBoard(null);
    setAddBoardOpen(true);
  };

  const onEditButtonClick = (board: BoardObj) => {
    setSelectedBoard(board);
    setAddBoardOpen(true);
  };

  const onAddBoard = (name: string) => {
    if (selectedBoard) {
      const board = { ...selectedBoard, name };
      dispatch(onEditBoardDetail(board));
    } else {
      dispatch(onAddNewBoard({ id: 0, name, list: [] }));
    }
  };

  const onViewBoardDetail = (board: BoardObj) => {
    history.push(`/apps/scrum-board/${board.id}`);
  };

  return (
    <>
      <Box
        sx={{
          pt: 4,
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Box
          component="h2"
          sx={{
            my: { xs: 5, sm: 5, xl: 8 },
            color: "text.primary",
            fontWeight: Fonts.BOLD,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          <IntlMessages id="scrumboard.scrumboardApp" />
        </Box>
        <AppGridContainer
          sx={{
            justifyContent: "center",
          }}
        >
          {boardList && boardList.length > 0
            ? boardList.map((board) => {
                return (
                  <BoardItem
                    key={board.id}
                    board={board}
                    onEditButtonClick={onEditButtonClick}
                    onViewBoardDetail={onViewBoardDetail}
                  />
                );
              })
            : null}
          <AddBoardButton onAddButtonClick={onAddButtonClick} />
        </AppGridContainer>
      </Box>

      {isAddBoardOpen ? (
        <AddNewBoard
          isAddBoardOpen={isAddBoardOpen}
          onCloseAddBoardModal={onCloseAddBoardModal}
          onAddBoard={onAddBoard}
          selectedBoard={selectedBoard}
        />
      ) : null}
      <AppInfoView />
    </>
  );
};

export default BoardList;
