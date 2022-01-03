import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onGetMemberList, onGetScrumLabelList } from "../../../redux/actions";
import BoardDetail from "./BoardDetail";
import BoardList from "./BoardList";
import { useParams } from "react-router-dom";

interface ParamsProps {
  id: string;
}

const ScrumBoard = () => {
  const dispatch = useDispatch();
  const params = useParams<ParamsProps>();

  useEffect(() => {
    dispatch(onGetScrumLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetMemberList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (params.id) {
      return <BoardDetail />;
    } else {
      return <BoardList />;
    }
  };

  return <>{onGetMainComponent()}</>;
};

export default ScrumBoard;
