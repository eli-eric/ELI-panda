import React, { useState } from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  onUpdateReadStatus,
  onUpdateStarredStatus,
} from "../../../../../redux/actions";
import IconButton from "@mui/material/IconButton";
import AppTooltip from "@crema/core/AppTooltip";
import { MailObj } from "types/models/apps/Mail";
import { AppState } from "../../../../../redux/store";

interface MoreOptionsProps {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
  path: string[];
}

const MoreOptions: React.FC<MoreOptionsProps> = ({
  checkedMails,
  setCheckedMails,
  path,
}) => {
  let unReadOption;
  let readOption;
  let starredOption;
  let unStarredOption;

  const dispatch = useDispatch();

  const { mailList }: { mailList: MailObj[] } = useSelector<
    AppState,
    AppState["mailApp"]
  >(({ mailApp }) => mailApp);

  const [isMoreIcon, onOpenMoreIcon] = useState(null);

  mailList.map((mail: MailObj) => {
    if (checkedMails.includes(mail.id) && mail.isRead) {
      unReadOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isRead) {
      readOption = true;
    }
    if (checkedMails.includes(mail.id) && mail.isStarred) {
      unStarredOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isStarred) {
      starredOption = true;
    }
    return null;
  });

  const onViewMoreOpen = (event: any) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const onChangeReadStatus = (statusValue: boolean) => {
    const status = !!statusValue;
    dispatch(onUpdateReadStatus(checkedMails, status));
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const onChangeAllReadStatus = (statusValue: boolean) => {
    const status = !!statusValue;
    const checkedMails = mailList.map((mail) => mail.id);
    dispatch(onUpdateReadStatus(checkedMails, status));
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const onChangeAllStarred = (status: boolean) => {
    const checkedMails = mailList.map((mail) => mail.id);
    dispatch(
      onUpdateStarredStatus(checkedMails, status, path[path.length - 1])
    );
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const onChangeStarredStatus = (status: boolean) => {
    dispatch(
      onUpdateStarredStatus(checkedMails, status, path[path.length - 1])
    );
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  return (
    <>
      {checkedMails.length > 0 ? (
        <Box component="span" sx={{ ml: { xs: "auto", sm: 0 } }}>
          <AppTooltip title={<IntlMessages id="common.more" />}>
            <IconButton
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              onClick={onViewMoreOpen}
              size="large"
            >
              <MoreVertIcon />
            </IconButton>
          </AppTooltip>

          <Menu
            anchorEl={isMoreIcon}
            open={Boolean(isMoreIcon)}
            onClose={onViewMoreClose}
          >
            {readOption ? (
              <MenuItem onClick={() => onChangeReadStatus(true)}>
                <IntlMessages id="mailApp.markAsRead" />
              </MenuItem>
            ) : null}
            {unReadOption ? (
              <MenuItem onClick={() => onChangeReadStatus(false)}>
                <IntlMessages id="mailApp.markAsUnread" />
              </MenuItem>
            ) : null}
            {starredOption ? (
              <MenuItem onClick={() => onChangeStarredStatus(true)}>
                <IntlMessages id="mailApp.markAsImportant" />
              </MenuItem>
            ) : null}
            {unStarredOption ? (
              <MenuItem onClick={() => onChangeStarredStatus(false)}>
                <IntlMessages id="mailApp.markAsNotImportant" />
              </MenuItem>
            ) : null}
          </Menu>
        </Box>
      ) : (
        <Box component="span" sx={{ ml: { xs: "auto", sm: 0 } }}>
          <AppTooltip title={<IntlMessages id="common.more" />}>
            <IconButton
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              onClick={onViewMoreOpen}
              size="large"
            >
              <MoreVertIcon />
            </IconButton>
          </AppTooltip>

          <Menu
            anchorEl={isMoreIcon}
            open={Boolean(isMoreIcon)}
            onClose={onViewMoreClose}
          >
            <MenuItem onClick={() => onChangeAllReadStatus(true)}>
              <IntlMessages id="mailApp.markAllAsRead" />
            </MenuItem>
            <MenuItem onClick={() => onChangeAllReadStatus(false)}>
              <IntlMessages id="mailApp.markAllAsUnread" />
            </MenuItem>
            <MenuItem onClick={() => onChangeAllStarred(true)}>
              <IntlMessages id="mailApp.markAllAsImportant" />
            </MenuItem>
            <MenuItem onClick={() => onChangeAllStarred(false)}>
              <IntlMessages id="mailApp.markAllAsNotImportant" />
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default MoreOptions;
