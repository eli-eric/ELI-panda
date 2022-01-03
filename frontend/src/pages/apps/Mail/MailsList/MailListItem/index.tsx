import React from "react";
import { alpha, Checkbox } from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";

import moment from "moment";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  MailInfoWrapper,
  MailItemWrapper,
  MainActionWrapper,
} from "./index.styles";
import { useDispatch } from "react-redux";
import {
  onUpdateMailFolders,
  onUpdateReadStatus as onUpdateMailReadStatus,
} from "../../../../../redux/actions";
import { Fonts } from "shared/constants/AppEnums";
import { MailObj } from "types/models/apps/Mail";

interface MailListItemProps {
  mail: MailObj;
  checkedMails: number[];
  onChangeCheckedMails: (check: boolean, id: number) => void;
  onChangeStarred: (checked: boolean, mail: MailObj) => void;
  onViewMailDetail: (mail: MailObj) => void;
}

const MailListItem: React.FC<MailListItemProps> = ({
  mail,
  checkedMails,
  onChangeCheckedMails,
  onChangeStarred,
  onViewMailDetail,
}) => {
  const messages = mail.messages!.length;
  const dispatch = useDispatch();
  const onGetMailDate = (date: string) => {
    if (
      moment(date, "ddd, MMM DD, YYYY").format() ===
      moment("ddd, MMM DD, YYYY").format()
    ) {
      return moment(date).format("LT");
    } else {
      return date.split(",")[1];
    }
  };

  const onArchive = (e: any) => {
    e.stopPropagation();
    dispatch(onUpdateMailFolders([mail.id], 127));
  };
  const onUpdateReadStatus = (e: any) => {
    e.stopPropagation();
    dispatch(onUpdateMailReadStatus([mail.id], !mail.isRead));
  };
  const onReportSpam = (e: any) => {
    e.stopPropagation();
    dispatch(onUpdateMailFolders([mail.id], 125));
  };
  const onDelete = (e: any) => {
    e.stopPropagation();
    dispatch(onUpdateMailFolders([mail.id], 126));
  };

  const getSenderName = () => {
    if (messages === 1) {
      return mail!.messages![0].sender!.name;
    } else if (messages === 2) {
      return `${mail.messages![0].sender.name}, ${
        mail.messages![1].sender.name
      }(2)`;
    } else {
      return `${mail.messages![0].sender.name}, ${
        mail.messages![messages - 2].sender.name
      }, ${mail.messages![messages - 1].sender.name}(${messages})`;
    }
  };
  const getLastSenderName = () => {
    if (messages === 1) {
      return mail.messages![0].sender.name;
    } else if (messages === 2) {
      return `${mail.messages![0].sender.name}, ${
        mail.messages![1].sender.name
      }(2)`;
    } else {
      return `${mail.messages![0].sender.name}, ${
        mail.messages![messages - 2].sender.name
      }, ${mail.messages![messages - 1].sender.name}(${messages})`;
    }
  };
  const getSenderImage = () => {
    if (messages === 1) {
      return mail.messages![0].sender.profilePic;
    } else if (messages === 2) {
      return `${mail.messages![0].sender.name}, ${
        mail.messages![1].sender.name
      }(2)`;
    } else {
      return `${mail.messages![0].sender.name}, ${
        mail.messages![messages - 2].sender.name
      }, ${mail.messages![messages - 1].sender.name}(${messages})`;
    }
  };

  return (
    <MailItemWrapper
      key={mail.id}
      className={clsx("item-hover", {
        active: checkedMails.includes(mail.id),
      })}
      sx={{
        backgroundColor: (theme) =>
          mail.isRead
            ? alpha(theme.palette.background.default, 0.8)
            : theme.palette.background.paper,
        fontWeight: !mail.isRead ? Fonts.MEDIUM : Fonts.REGULAR,
      }}
      onClick={() => onViewMailDetail(mail)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-block",
          }}
          onClick={(event: any) => event.stopPropagation()}
        >
          <Checkbox
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            checked={checkedMails.includes(mail.id)}
            onChange={(event) =>
              onChangeCheckedMails(event.target.checked, mail.id)
            }
            color="primary"
          />
        </Box>
        <Box
          sx={{
            mr: 2.5,
            display: { xs: "none", sm: "inline-block" },
            "& .MuiCheckbox-root": {
              color: (theme) => theme.palette.warning.main,
            },
          }}
          component="span"
          onClick={(event: any) => event.stopPropagation()}
        >
          <AppsStarredIcon item={mail} onChange={onChangeStarred} />
        </Box>

        <Box
          sx={{
            mr: 3.5,
          }}
        >
          <Avatar
            className="avatar"
            alt={getSenderName()}
            src={getSenderImage()}
          />
        </Box>

        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: mail.isRead ? Fonts.REGULAR : Fonts.MEDIUM,
            fontSize: 14,
            width: { sm: "120px" },
          }}
          className={clsx(!mail.isRead ? "fontBold" : "")}
        >
          {mail.isReplied
            ? `${getSenderName()}, me(${messages})`
            : getLastSenderName()}
        </Typography>
      </Box>

      <MailInfoWrapper>
        <Box
          className="mail-info-content"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "calc(100% - 120px)",
            transition: "all 0.4s ease",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mr: 3,
              mb: 0,
            }}
            component="p"
            className={clsx(!mail.isRead ? "fontBold" : "")}
          >
            {mail.subject}
          </Box>
          {mail.hasAttachments ? (
            <Box
              component="p"
              sx={{
                color: "text.secondary",
                position: "relative",
                "& .MuiSvgIcon-root": {
                  fontSize: 16,
                  display: "block",
                },
              }}
            >
              <AttachFileIcon />
            </Box>
          ) : null}
          <Box
            component="p"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "text.secondary",
            }}
          >
            {mail!.subject}
          </Box>
        </Box>

        <Box
          className="mail-time"
          component="span"
          sx={{
            px: 2.5,
            minWidth: 110,
            marginLeft: "auto",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            transition: "all 0.4s ease",
          }}
        >
          <Box
            sx={{
              color: mail.label.color,
            }}
            component="span"
          >
            <LabelOutlinedIcon
              sx={{
                display: "block",
              }}
            />
          </Box>
          <Box
            component="span"
            sx={{
              whiteSpace: "pre",
              fontWeight: Fonts.MEDIUM,
              pl: 2,
            }}
          >
            {onGetMailDate(mail.sentAt!)}
          </Box>
        </Box>

        <MainActionWrapper className="main-action-wrapper">
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={onArchive}
            size="large"
          >
            <ArchiveOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={onDelete}
            size="large"
          >
            <DeleteOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={onUpdateReadStatus}
            size="large"
          >
            {mail.isRead ? <MailOutlinedIcon /> : <DraftsOutlinedIcon />}
          </IconButton>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={onReportSpam}
            size="large"
          >
            <InfoOutlinedIcon />
          </IconButton>
        </MainActionWrapper>
      </MailInfoWrapper>
    </MailItemWrapper>
  );
};

export default MailListItem;
