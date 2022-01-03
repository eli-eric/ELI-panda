import React from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { onUpdateContactLabel } from "../../../../../redux/actions/ContactApp";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Hidden } from "@mui/material";
import AppTooltip from "@crema/core/AppTooltip";

interface ContactCheckedActionsProps {
  checkedContacts: number[];
  setCheckedContacts: (checkedContacts: number[]) => void;
  onSelectContactsForDelete: (checkedContacts: number[]) => void;
}

const ContactCheckedActions: React.FC<ContactCheckedActionsProps> = ({
  checkedContacts,
  setCheckedContacts,
  onSelectContactsForDelete,
}) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const [isLabelOpen, onOpenLabel] = React.useState<null | HTMLElement>(null);

  const onLabelOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onSelectLabel = (event: any) => {
    const path = pathname.split("/");
    const labelType = event.target.value;
    dispatch(
      onUpdateContactLabel(checkedContacts, labelType, path[path.length - 2])
    );
    setCheckedContacts([]);
    onLabelClose();
  };

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        mr: { xs: 2, xl: 3 },
      }}
    >
      <AppTooltip title={<IntlMessages id="common.delete" />}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          size="large"
        >
          <DeleteOutlinedIcon
            sx={{
              cursor: "pointer",
              display: "block",
            }}
            onClick={() => onSelectContactsForDelete(checkedContacts)}
          />
        </IconButton>
      </AppTooltip>

      <Hidden smDown>
        <AppTooltip title={<IntlMessages id="common.label" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
              cursor: "pointer",
              display: "block",
            }}
            size="large"
            value={1}
            onClick={onLabelOpen}
          >
            <LabelOutlinedIcon />
          </IconButton>
        </AppTooltip>
      </Hidden>

      <Menu
        anchorEl={isLabelOpen}
        keepMounted
        elevation={0}
        open={Boolean(isLabelOpen)}
        onClose={onLabelClose}
      >
        <MenuItem value={311} onClick={onSelectLabel}>
          <IntlMessages id="common.crema" />
        </MenuItem>
        <MenuItem value={312} onClick={onSelectLabel}>
          <IntlMessages id="common.personal" />
        </MenuItem>
        <MenuItem value={313} onClick={onSelectLabel}>
          <IntlMessages id="common.work" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ContactCheckedActions;
