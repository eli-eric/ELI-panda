import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useIntl } from "react-intl";
import { orange } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { AppList } from "../../../../../../@crema";
import IntlMessages from "../../../../../../@crema/utility/IntlMessages";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AppScrollbar from "../../../../../../@crema/core/AppScrollbar";

interface CardCommentsProps {
  comments: any[];
  onAddNewComment: (comment: string) => void;
}

const CardComments: React.FC<CardCommentsProps> = ({
  comments,
  onAddNewComment,
}) => {
  const [comment, setComment] = useState("");

  const onAddComment = () => {
    onAddNewComment(comment);
    setComment("");
  };

  const { messages } = useIntl();
  return (
    <Box>
      <Box component="h4">
        <IntlMessages id="common.comments" />
      </Box>

      <Box
        sx={{
          mb: 5,
        }}
      >
        <AppScrollbar
          sx={{
            maxHeight: 200,
          }}
        >
          <AppList
            data={comments}
            renderRow={(item, index) => {
              const isPreviousSender =
                index > 0 && comments[index - 1].sender.id === item.sender.id;
              return (
                <Box
                  sx={{
                    display: "flex",
                    marginTop: isPreviousSender ? 1 : 16,
                    "& .avatar": {
                      display: isPreviousSender ? "none" : "visible",
                    },
                    "& .date": {
                      display: isPreviousSender ? "none" : "visible",
                    },
                  }}
                  key={index}
                >
                  {item.sender.image ? (
                    <Avatar
                      src={item.sender.image}
                      className="avatar"
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: orange[500],
                      }}
                    />
                  ) : (
                    <Avatar
                      className="avatar"
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: orange[500],
                      }}
                    >
                      {item.sender.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )}

                  <Box sx={{ marginLeft: isPreviousSender ? 55 : 15 }}>
                    <Box
                      sx={{
                        color: "text.disabled",
                        fontSize: 12,
                        display: "block",
                        marginBottom: 6,
                      }}
                      className="date"
                    >
                      {item.date}
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        borderRadius: "0 10px 10px 0",
                        padding: "6px 12px",
                        position: "relative",
                        backgroundColor: (theme) =>
                          theme.palette.background.default,
                        border: (theme) =>
                          `@border-style-base @border-width-base ${theme.palette.divider}`,

                        ".last-scrum-board-message &": {
                          borderRadius: "0 10px 10px 10px",
                        },
                        "& p": {
                          marginBottom: 0,
                        },
                      }}
                      component="p"
                    >
                      {item.comment}
                    </Box>
                  </Box>
                </Box>
              );
            }}
          />
        </AppScrollbar>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            width: "100%",
          }}
          rows="1"
          variant="outlined"
          placeholder={messages["common.pressEnter"] as string}
        />
        <IconButton
          disabled={!comment}
          onClick={() => onAddComment()}
          sx={{
            ml: 2,
            "& svg": {
              pl: 1,
            },
          }}
          aria-label="send"
        >
          <SendOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardComments;
