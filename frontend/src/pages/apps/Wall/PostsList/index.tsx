import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetPostsList } from "../../../../redux/actions/WallApp";
import AppList from "@crema/core/AppList";
import PostItem from "./PostItem";
import { AppState } from "../../../../redux/store";

const PostsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetPostsList());
  }, [dispatch]);

  const { postList, wallData } = useSelector<AppState, AppState["wallApp"]>(
    ({ wallApp }) => wallApp
  );

  return (
    <AppList
      data={postList}
      renderRow={(post, index) => (
        <PostItem key={index} post={post} wallData={wallData} />
      )}
    />
  );
};

export default PostsList;
