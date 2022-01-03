import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserList } from "../../../redux/actions";
import ListItem from "./ListItem";
import AppInfoView from "@crema/core/AppInfoView";
import Box from "@mui/material/Box";
import AppList from "../../../@crema/core/AppList";
import { AppState } from "../../../redux/store";

const Standard = () => {
  const dispatch = useDispatch();

  const usersList = useSelector<AppState, AppState["userList"]>(
    ({ userList }) => userList
  ).usersList;

  useEffect(() => {
    dispatch(onGetUserList());
  }, [dispatch]);

  return (
    <Box flex={1}>
      {usersList ? (
        <AppList
          data={usersList}
          renderRow={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      ) : null}
      <AppInfoView />
    </Box>
  );
};

export default Standard;
