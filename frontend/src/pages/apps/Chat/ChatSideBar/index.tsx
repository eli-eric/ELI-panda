import React, { useState } from "react";
import UserInfo from "./UserInfo";
import ChatTabs from "./ChatTabs";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import moment from "moment";
import { Zoom } from "@mui/material";
import { useIntl } from "react-intl";
import AppSearchBar from "@crema/core/AppSearchBar";
import { useAuthUser } from "@crema/utility/AuthHooks";
import { AppState } from "../../../../redux/store";
import { ConnectionObj } from "types/models/apps/Chat";

const ChatSideBar = () => {
  const [keywords, setKeywords] = useState("");
  const { user } = useAuthUser();

  const { connectionList }: { connectionList: ConnectionObj[] } = useSelector<
    AppState,
    AppState["chatApp"]
  >(({ chatApp }) => chatApp);
  const { loading } = useSelector<AppState, AppState["common"]>(
    ({ common }) => common
  );

  const getConnectionList = () => {
    if (keywords !== "") {
      return connectionList.filter((item) =>
        item.name.toUpperCase().includes(keywords.toUpperCase())
      );
    }
    return connectionList;
  };

  const getChatList = () => {
    let chatsList = connectionList.filter(
      (item: ConnectionObj) => item.lastMessage
    );
    if (keywords !== "") {
      chatsList = chatsList.filter((item) =>
        item.name.toUpperCase().includes(keywords.toUpperCase())
      );
    }
    chatsList.sort((a, b) => {
      let momentA: any = moment(a.lastMessage!.time).format("X");
      let momentB: any = moment(b.lastMessage!.time).format("X");
      return momentB - momentA;
    });
    return chatsList;
  };

  const connectionListData = getConnectionList();

  const chatListData = getChatList();

  const { messages } = useIntl();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Zoom in style={{ transitionDelay: "300ms" }}>
        <Box
          sx={{
            px: 5,
            pt: 4,
            pb: 2,
          }}
        >
          <UserInfo user={user} />
        </Box>
      </Zoom>
      <Box
        sx={{
          px: 5,
          pt: 2,
          width: 1,
        }}
      >
        <AppSearchBar
          sx={{
            marginRight: 0,
            width: "100%",
            "& .searchRoot": {
              width: "100%",
            },
            "& .MuiInputBase-input": {
              width: "100%",
              "&:focus": {
                width: "100%",
              },
            },
          }}
          iconPosition="right"
          overlap={false}
          value={keywords}
          onChange={(e: any) => setKeywords(e.target.value)}
          placeholder={messages["common.searchHere"] as string}
        />
      </Box>

      <ChatTabs
        connectionListData={connectionListData}
        chatListData={chatListData}
        loading={loading}
      />
    </Box>
  );
};

export default ChatSideBar;
