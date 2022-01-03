import React, { useState } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import IntlMessages from "@crema/utility/IntlMessages";
import { MessageType } from "@crema/services/db/apps/chat/connectionList";
import { getFileSize } from "@crema/utility/helper/Utils";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import IconButton from "@mui/material/IconButton";
import MediaViewer from "@crema/core/AppMedialViewer";
import { orange } from "@mui/material/colors";
import { alpha } from "@mui/material";
import { Fonts } from "../../../../../../shared/constants/AppEnums";
import { MediaObj, MessageDataObj } from "types/models/apps/Chat";
import { AuthUser } from "types/models/AuthUser";

import { styled } from "@mui/material/styles";

const SenderMessageWrapper = styled("div")(({ theme }) => {
  return {
    mt: 5.5,
    display: "flex",
    justifyContent: "flex-end",
    "&:last-of-type": {
      marginBottom: 0,
    },
    "&.last-chat-message .message-chat": {
      borderBottomRightRadius: 16,
    },
    "& .message-chat-avatar": {
      marginRight: 0,
      marginBottom: 0,
    },
    "& .message-chat-item": {
      textAlign: "right",
    },
    "& .edit-view": {
      paddingLeft: 0,
      paddingRight: 10,
    },
    "&:hover": {
      "& .message-more-dropdown-link": {
        opacity: 1,
        visibility: "visible",
      },
    },
    "&.hideUser-info": {
      position: "relative",
      marginTop: 1,
      "& .message-time, & .message-chat-avatar": {
        display: "none",
      },
      "& .message-chat-sender": {
        marginBottom: 0,
      },
      "& .message-chat-item": {
        marginRight: 34,
      },
    },
  };
});

const VideoWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    width: 56,
    height: 56,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: theme.palette.common.black,
    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      paddingTop: "100%",
    },
    "& video, & iframe, & embed, & object": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      border: "0 none",
      objectFit: "cover",
    },
  };
});
const MessageChat = styled("div")(({ theme }) => {
  return {
    display: "inline-flex",
    border: `solid 1px ${theme.palette.grey[200]}`,
    padding: "10px 16px",
    position: "relative",
    fontSize: 14,
    flexDirection: "row-reverse",
    textAlign: "right",
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.text.secondary,
    borderRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    "& .download-icon": {
      position: "absolute",
      right: 5,
      bottom: 5,
      zIndex: 1,
    },
    ".last-chat-message &": {
      borderBottomLeftRadius: 16,
    },
  };
});

const showMediaItems = 2;
const getMediaMessage = (item: MediaObj) => {
  if (item.mime_type.startsWith("image")) {
    return (
      <Box
        sx={{
          position: "relative",
          "& img": {
            objectFit: "cover",
            borderRadius: 1,
            width: 56,
            height: 56,
            display: "block",
          },
        }}
      >
        <img alt="" src={item.url} />
      </Box>
    );
  } else if (item.mime_type.startsWith("video")) {
    return (
      <VideoWrapper>
        <video src={item.url} />
        <PlayCircleOutlineIcon
          sx={{
            fontSize: 20,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: (theme) => theme.palette.common.white,
          }}
        />
      </VideoWrapper>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <DescriptionOutlinedIcon />
        <Box
          component="p"
          sx={{
            ml: 2,
          }}
        >
          <Box component="span" sx={{ display: "block" }}>
            {item.file_name}
          </Box>
          <Box component="span" sx={{ display: "block" }}>
            {getFileSize(item.file_size as number)}
          </Box>
        </Box>
      </Box>
    );
  }
};

const getMessage = (
  item: MessageDataObj,
  setIndex: (index: number) => void
) => {
  if (item.message_type === MessageType.TEXT) {
    return <Box component="p">{item.message}</Box>;
  } else {
    return (
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          verticalAlign: "top",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: -1,
          }}
        >
          {item.media!.slice(0, showMediaItems).map((data, index) => (
            <Box
              sx={{
                padding: 1,
                cursor: "pointer",
              }}
              key={"media-" + data.id}
              onClick={() => setIndex(index)}
            >
              {getMediaMessage(data)}
            </Box>
          ))}
          {item.media!.length > showMediaItems ? (
            <Box
              sx={{
                padding: 1,
                cursor: "pointer",
              }}
              onClick={() => setIndex(showMediaItems)}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.35),
                  color: (theme) => theme.palette.primary.contrastText,
                  fontWeight: Fonts.MEDIUM,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +{item.media!.length - showMediaItems}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  }
};

interface SenderMessageItemProps {
  item: MessageDataObj;
  authUser: AuthUser;
  onClickEditMessage: (item: MessageDataObj) => void;
  deleteMessage: (id: any) => void;
  isPreviousSender: boolean;
  isLast: boolean;
}

const SenderMessageItem: React.FC<SenderMessageItemProps> = ({
  authUser,
  item,
  onClickEditMessage,
  deleteMessage,
  isPreviousSender = false,
  isLast,
}) => {
  const [isMoreIcon, onOpenMoreIcon] = useState(null);
  const [index, setIndex] = useState(-1);

  const onViewMoreOpen = (event: any) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const getUserAvatar = () => {
    const name = authUser.displayName;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (authUser.email) {
      return authUser.email.charAt(0).toUpperCase();
    }
  };

  const onClose = () => {
    setIndex(-1);
  };

  return (
    <SenderMessageWrapper
      className={clsx(
        isPreviousSender ? "hideUser-info" : "",
        isLast ? "last-chat-message" : ""
      )}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
          className="message-chat-item"
        >
          <Box
            sx={{
              ml: 0,
              textAlign: "right",
              fontSize: 12,
              color: (theme) => theme.palette.text.secondary,
              display: "block",
              mb: 1.5,
            }}
            component="span"
            className="message-time"
          >
            {item.time}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row-reverse",
            }}
          >
            <MessageChat>{getMessage(item, setIndex)}</MessageChat>

            {item.edited && (
              <Box
                sx={{
                  pl: 2.5,
                  color: (theme) => theme.palette.text.secondary,
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                  },
                }}
                className="edit-view"
              >
                <EditIcon />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 5.5,
            ml: 2.5,
          }}
          className="message-chat-sender"
        >
          {authUser.photoURL ? (
            <Avatar
              sx={{
                backgroundColor: orange[500],
                width: 34,
                height: 34,
                mr: 2.5,
                mb: 5.5,
              }}
              className="message-chat-avatar"
              src={authUser.photoURL}
            />
          ) : (
            <Avatar
              sx={{
                backgroundColor: orange[500],
                width: 34,
                height: 34,
                mr: 2.5,
                mb: 5.5,
              }}
              className="message-chat-avatar"
            >
              {getUserAvatar()}
            </Avatar>
          )}

          <Box
            sx={{
              mr: -2.5,
              fontSize: 20,
              display: "inline-block",
              opacity: 0,
              visibility: "hidden",
              transition: "all 0.3s ease",
              "& .MuiIconButton-root": {
                padding: 1.25,
                color: (theme) => theme.palette.text.disabled,
              },
            }}
            className="message-more-dropdown-link"
          >
            <IconButton size="large">
              <MoreVertIcon onClick={onViewMoreOpen} />
            </IconButton>

            <Menu
              anchorEl={isMoreIcon}
              open={Boolean(isMoreIcon)}
              onClose={onViewMoreClose}
            >
              {item.message_type === MessageType.TEXT ? (
                <MenuItem
                  onClick={() => {
                    onViewMoreClose();
                    onClickEditMessage(item);
                  }}
                >
                  <IntlMessages id="common.edit" />
                </MenuItem>
              ) : null}
              <MenuItem
                onClick={() => {
                  onViewMoreClose();
                  deleteMessage(item.id);
                }}
              >
                <IntlMessages id="common.delete" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <MediaViewer index={index} medias={item.media!} onClose={onClose} />
    </SenderMessageWrapper>
  );
};

export default SenderMessageItem;
