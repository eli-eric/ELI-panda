import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import moment from "moment";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import Avatar from "@mui/material/Avatar";
import {
  AttachmentWrapper,
  AvatarWrapper,
  MailMobileItemWrapper,
} from "./index.styles";
import { getStringFromHtml } from "../../../../../@crema/utility/helper/StringHelper";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { MailObj } from "types/models/apps/Mail";
import { alpha } from "@mui/material";

interface MailListItemProps {
  mail: MailObj;
  checkedMails: number[];
  onChangeCheckedMails: (check: boolean, id: number) => void;
  onChangeStarred: (checked: boolean, mail: MailObj) => void;
  onViewMailDetail: (mail: MailObj) => void;
}

const MailListItemMobile: React.FC<MailListItemProps> = ({
  mail,
  checkedMails,
  onChangeCheckedMails,
  onChangeStarred,
  onViewMailDetail,
}) => {
  const messages = mail.messages!.length;
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
  const getLastMessage = () => {
    return getStringFromHtml(mail.messages![0].description);
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
    <MailMobileItemWrapper
      key={mail.id}
      sx={{
        backgroundColor: (theme) =>
          mail.isRead
            ? alpha(theme.palette.background.default, 0.8)
            : theme.palette.background.paper,
      }}
      className={clsx("item-hover", {
        active: checkedMails.includes(mail.id),
      })}
      onClick={() => onViewMailDetail(mail)}
    >
      <Box
        sx={{
          mr: 3.5,
          mt: 1,
        }}
      >
        <AvatarWrapper
          className={clsx({
            checked: checkedMails.includes(mail.id),
          })}
          onClick={(event) => {
            event.stopPropagation();
            onChangeCheckedMails(!checkedMails.includes(mail.id), mail.id);
          }}
        >
          {checkedMails.includes(mail.id) ? (
            <CheckOutlinedIcon />
          ) : (
            <Avatar
              className="avatar"
              alt={getSenderName()}
              src={getSenderImage()}
            />
          )}
        </AvatarWrapper>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "calc(100% - 50px)",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 60px)",
            pr: 2,
            transition: "all 0.4s ease",
          }}
        >
          <Typography
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {mail.isReplied
              ? `${getSenderName()}, me(${messages})`
              : getLastSenderName()}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {mail.subject}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {getLastMessage()}
          </Typography>
          {mail.hasAttachments ? (
            <AttachmentWrapper>
              <AttachFileIcon />
            </AttachmentWrapper>
          ) : null}
        </Box>

        <Box
          sx={{
            minWidth: 60,
            pt: 0.75,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            transition: "all 0.4s ease",
          }}
        >
          <Box
            component="span"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 12,
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {onGetMailDate(mail.sentAt!)}
          </Box>

          <Box
            component="span"
            sx={{
              mt: "auto",
            }}
            onClick={(event: any) => event.stopPropagation()}
          >
            <AppsStarredIcon item={mail} onChange={onChangeStarred} />
          </Box>
        </Box>
      </Box>
    </MailMobileItemWrapper>
  );
};

export default MailListItemMobile;
