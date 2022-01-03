import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import AppsContainer from "@crema/core/AppsContainer";
import BoardDetailView from "./BoardDetailView";
import { useHistory, useLocation } from "react-router-dom";
import {
  onGetBoardDetail,
  onNullifyBoardDetail,
} from "../../../../redux/actions";
import { AppState } from "../../../../redux/store";
import { BoardObj } from "types/models/apps/ScrumbBoard";

const BoardDetail = () => {
  const history = useHistory();
  const { boardDetail }: { boardDetail: BoardObj } = useSelector<
    AppState,
    AppState["scrumboardApp"]
  >(({ scrumboardApp }) => scrumboardApp);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split("/");
    const id = path[path.length - 1];
    dispatch(onGetBoardDetail(id));
    return () => {
      dispatch(onNullifyBoardDetail());
    };
  }, [dispatch, pathname]);

  const onGoToBoardList = () => {
    history.goBack();
  };

  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      title={
        <>
          <Box
            component="span"
            sx={{
              cursor: "pointer",
              mr: 2,
              color: "primary.main",
            }}
            onClick={onGoToBoardList}
          >
            Scrum Board
          </Box>
          &gt; {boardDetail.name}
        </>
      }
    >
      {/*<BoardDetailView boardDetail={boardDetail} />*/}
      <BoardDetailView />
    </AppsContainer>
  );
};

export default BoardDetail;
