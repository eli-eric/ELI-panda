import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AppTooltip from "../../../../../@crema/core/AppTooltip";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import { Checkbox, Popover, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import renderHTML from "react-render-html";
import { IoArrowUndoOutline } from "react-icons/io5";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ForwardMail from "./ForwardMail";
import moment from "moment";
import { BiChevronDown } from "react-icons/bi";
import { getStringFromHtml } from "../../../../../@crema/utility/helper/StringHelper";

import clsx from "clsx";
import { Message } from "types/models/apps/Mail";
import { styled } from "@mui/material/styles";
import { Fonts } from "../../../../../shared/constants/AppEnums";

const MailDetailUser = styled("div")(({ theme }) => {
  return {
    display: "flex",
    width: "100%",
    "&.has-expanded": {
      [theme.breakpoints.up("md")]: {
        width: "calc(100% - 200px)",
        paddingRight: 8,
      },
      [theme.breakpoints.up("xl")]: {
        width: "calc(100% - 300px)",
      },
    },
  };
});

const MailDescriptionItem = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    "&:not(:last-of-type)": {
      marginBottom: 4,
    },
    "& .mail-description-name": {
      width: 80,
      color: theme.palette.text.disabled,
      textAlign: "right",
      paddingRight: 15,
    },
  };
});

interface ReplyMailProps {
  message: Message;
  index: number;
  mailLength: number;
  onSubmitMail: (message: Message, index: number) => void;
  onChangeStarred: (message: Message, isStarred: boolean) => void;
}

const MessageItem: React.FC<ReplyMailProps> = ({
  message,
  mailLength,
  index,
  onSubmitMail,
  onChangeStarred,
}) => {
  const [isExpanded, setExpanded] = useState(mailLength === index + 1);

  const [{ isReply, isForward }, onSelectMethod] = useState({
    isReply: false,
    isForward: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onReplyToMail = () => {
    onSelectMethod({ isReply: true, isForward: false });
  };

  const onSubmitForwardedMail = (mail: Message) => {
    onSelectMethod({
      isReply: false,
      isForward: false,
    });
    onSubmitMail(mail, index);
  };

  const onGetMailDate = (date: string) => {
    return moment(date).format("ddd, MMM DD, YYYY");
  };

  const onGetMailTime = (date: string) => {
    return moment(date).format("LT");
  };

  const getSenderName = () => {
    return message.sender.name;
  };

  const getSenderImage = () => {
    return message.sender.profilePic;
  };

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    event.stopPropagation();
    event.preventDefault();
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log("anchorEl, open: ", anchorEl, open);
  const mailDescription = () => {
    return (
      <Box
        sx={{
          position: "relative",
          padding: "12px 16px",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <MailDescriptionItem>
          <span className="mail-description-name">from:</span>
          <span>
            <strong>{message.sender.name}</strong>
            <span style={{ fontSize: 12 }}> {`<${message.sender.email}>`}</span>
          </span>
        </MailDescriptionItem>
        <MailDescriptionItem>
          <span className="mail-description-name">reply-to:</span>
          <span>{message.to[0].email}</span>
        </MailDescriptionItem>
        <MailDescriptionItem>
          <span className="mail-description-name">date:</span>
          <span>{onGetMailDate(message.sentOn)}</span>
        </MailDescriptionItem>
        <MailDescriptionItem>
          <span className="mail-description-name">subject:</span>
          <span>how you get new orders easily</span>
        </MailDescriptionItem>
      </Box>
    );
  };

  const getHeaderDescription = () => {
    if (isExpanded) {
      return (
        <>
          <span
            onClick={handleClick}
            style={{
              display: "inline-flex",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            <AppTooltip
              title={message.to.map((user) => user.name)}
              placement="bottom"
            >
              <>
                {`to ${message.to.map((user) => user.email).toString()}`}
                <span style={{ marginTop: 0, fontSize: 18 }}>
                  <BiChevronDown />
                </span>
              </>
            </AppTooltip>
          </span>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {mailDescription()}
          </Popover>
        </>
      );
    } else {
      return (
        <Box
          sx={{
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {getStringFromHtml(message.description)}
        </Box>
      );
    }
  };
  return (
    <Box
      sx={{
        "&:not(:last-of-type)": {
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          mb: 3.75,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mb: 3.75,
          cursor: "pointer",
        }}
      >
        <MailDetailUser
          className={clsx({ "has-expanded": isExpanded })}
          onClick={() => {
            if (mailLength !== index + 1) setExpanded(!isExpanded);
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
            src={getSenderImage()}
            alt={getSenderName()}
          />

          <Box
            sx={{
              position: "relative",
              width: "calc(100% - 55px)",
              ml: 3.5,
            }}
          >
            <Typography
              component="h3"
              sx={{
                mb: 0.5,
                color: (theme) => theme.palette.primary.main,
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
                "& span": {
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: 12,
                  wordBreak: "break-all",
                  ml: 1,
                },
              }}
            >
              {message.sender.name}
              {isExpanded ? (
                <span>{`<${message.sender.email}>`}</span>
              ) : (
                <span>{onGetMailDate(message.sentOn)}</span>
              )}
            </Typography>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                wordBreak: "break-all",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                lineHeight: 1,
                display: "block",
              }}
            >
              {getHeaderDescription()}
            </Box>
          </Box>
        </MailDetailUser>

        {isExpanded ? (
          <Box
            sx={{
              ml: { xs: 0, md: "auto" },
              mt: { xs: 1.5, md: 0 },
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: { md: "flex-end" },
            }}
          >
            <Box component="span">{onGetMailDate(message.sentOn)}</Box>,
            <Box
              component="span"
              sx={{
                ml: 1,
              }}
            >
              {onGetMailTime(message.sentOn)}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: { xs: "auto", md: 3 },
                mr: -3,
              }}
            >
              <AppTooltip title={<IntlMessages id="common.starred" />}>
                <Checkbox
                  sx={{
                    color: (theme) => theme.palette.warning.main,
                    padding: 1.5,
                    "&.Mui-checked": {
                      color: (theme) => theme.palette.warning.main,
                    },
                  }}
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon />}
                  checked={message.isStarred}
                  onChange={(event) =>
                    onChangeStarred(message, event.target.checked)
                  }
                />
              </AppTooltip>

              <AppTooltip title={<IntlMessages id="common.reply" />}>
                <IconButton
                  sx={{
                    padding: 1.75,
                    "& svg": {
                      fontSize: 22,
                    },
                  }}
                  size="large"
                >
                  <IoArrowUndoOutline
                    className="pointer"
                    onClick={onReplyToMail}
                  />
                </IconButton>
              </AppTooltip>

              <AppTooltip title={<IntlMessages id="common.more" />}>
                <IconButton
                  sx={{
                    padding: 1.75,
                    "& svg": {
                      fontSize: 22,
                    },
                  }}
                  size="large"
                >
                  <MoreVertIcon className="pointer" />
                </IconButton>
              </AppTooltip>
            </Box>
          </Box>
        ) : null}
      </Box>

      {isExpanded ? (
        <Box
          sx={{
            mb: 5,
            ml: { md: 12.5 },
            mr: { md: 8 },
          }}
        >
          {renderHTML(message.description)}
        </Box>
      ) : null}

      {isForward || isReply ? (
        <ForwardMail
          selectedMail={message}
          onSubmitForwardedMail={onSubmitForwardedMail}
        />
      ) : null}
    </Box>
  );
};

export default MessageItem;
