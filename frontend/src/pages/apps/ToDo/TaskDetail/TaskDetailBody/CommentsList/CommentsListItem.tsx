import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { CommentObj } from "types/models/apps/Todo";
import { styled } from "@mui/material/styles";

const CommentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
  padding: "8px 12px",
  border: `solid 1px ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  ".last-chat-message &": {
    borderBottomLeftRadius: 16,
  },
}));

interface CommentsListItemProps {
  item: CommentObj;
  isPreviousSender: boolean;
  isLast: boolean;
}

const CommentsListItem: React.FC<CommentsListItemProps> = ({
  item,
  isPreviousSender = false,
  isLast,
}) => {
  return (
    <Box
      sx={{
        marginTop: 1.5,
        display: "flex",
        position: "relative",

        "&.hideUserInfo": {
          position: "relative",
          marginTop: 1,
          "& .todo-comment-time, & .todo-comment-user": {
            display: "none",
          },
          "& .todo-comment-info": {
            marginLeft: 11.5,
          },
        },
      }}
      className={clsx(
        isPreviousSender ? "hideUserInfo" : "first-chat-message",
        isLast ? "last-chat-message" : ""
      )}
    >
      <Box
        sx={{
          marginRight: 2.5,
          position: "relative",
        }}
        className="todo-comment-user"
      >
        {item.image ? (
          <Avatar
            src={item.image}
            sx={{
              height: 36,
              width: 36,
            }}
          />
        ) : (
          <Avatar
            sx={{
              height: 36,
              width: 36,
            }}
          >
            {item.name[0]}
          </Avatar>
        )}
      </Box>
      <Box
        sx={{
          position: "relative",
        }}
        className="todo-comment-info"
      >
        <Box
          sx={{
            display: "block",
            marginBottom: 1.5,
            color: "text.secondary",
            fontSize: 12,
            "& > span": {
              marginRight: 1,
            },
          }}
          className="todo-comment-time"
        >
          <span>{item.name},</span>
          <span>{item.time},</span>
          <span>{item.date}</span>
        </Box>
        <CommentWrapper>
          <Typography>{item.comment}</Typography>
        </CommentWrapper>
      </Box>
    </Box>
  );
};

export default CommentsListItem;
