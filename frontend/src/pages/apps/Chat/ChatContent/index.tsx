import React from "react";
import { useSelector } from "react-redux";
import NoUserScreen from "./NoUserScreen";
import ChatViewContainer from "./ChatViewContainer";

import { styled } from "@mui/material/styles";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { AppState } from "../../../../redux/store";

const MessagesScreen = styled("div")(() => {
  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };
});
const ScrollChatNoUser = styled("div")(({ theme }) => {
  return {
    fontSize: 18,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "calc(100vh - 169px) !important",
    fontWeight: Fonts.MEDIUM,
    [theme.breakpoints.up("lg")]: {
      fontSize: 20,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
      color: "#BDBDBD",
      [theme.breakpoints.up("lg")]: {
        fontSize: "5rem",
      },
    },
  };
});

const ChatContent = () => {
  const { selectedUser } = useSelector<AppState, AppState["chatApp"]>(
    ({ chatApp }) => chatApp
  );

  return (
    <>
      {selectedUser ? (
        <MessagesScreen>
          <ChatViewContainer selectedUser={selectedUser} />
        </MessagesScreen>
      ) : (
        <ScrollChatNoUser>
          <NoUserScreen />
        </ScrollChatNoUser>
      )}
    </>
  );
};

export default ChatContent;
