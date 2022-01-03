import React from "react";
import Box from "@mui/material/Box";
import SenderMessageItem from "./SenderMessageItem";
import ReceiverMessageItem from "./ReceiverMessageItem";
import AppList from "@crema/core/AppList";
import {
  ConnectionObj,
  MessageDataObj,
  MessageObj,
} from "types/models/apps/Chat";
import { AuthUser } from "types/models/AuthUser";

interface MessagesListProps {
  userMessages: MessageObj;
  authUser: AuthUser;
  selectedUser: ConnectionObj;
  onClickEditMessage: (data: MessageDataObj) => void;
  deleteMessage: (id: number) => void;
}

const MessageList: React.FC<MessagesListProps> = ({
  userMessages,
  authUser,
  selectedUser,
  onClickEditMessage,
  deleteMessage,
}) => {
  return (
    <Box
      sx={{
        px: 5,
        py: 6,
      }}
    >
      <AppList
        animation="transition.slideUpIn"
        data={userMessages.messageData}
        renderRow={(item, index) => {
          console.log("item, authUser: ", item, authUser);
          if (item.sender === authUser.id) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                key={item.id}
                onClickEditMessage={onClickEditMessage}
                deleteMessage={deleteMessage}
                isPreviousSender={
                  index > 0 &&
                  item.sender === userMessages.messageData[index - 1].sender
                }
                isLast={
                  (index + 1 < userMessages.messageData.length &&
                    item.sender !==
                      userMessages.messageData[index + 1].sender) ||
                  index + 1 === userMessages.messageData.length
                }
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                selectedUser={selectedUser}
                item={item}
                key={item.id}
                isPreviousSender={
                  index > 0 &&
                  item.sender === userMessages.messageData[index - 1].sender
                }
                isLast={
                  (index + 1 < userMessages.messageData.length &&
                    item.sender !==
                      userMessages.messageData[index + 1].sender) ||
                  index + 1 === userMessages.messageData.length
                }
              />
            );
          }
        }}
      />
    </Box>
  );
};

export default MessageList;
