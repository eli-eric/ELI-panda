import React from "react";
import IntlMessages from "@crema/utility/IntlMessages";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {
  onDeleteSelectedTasks,
  onUpdateTaskLabels,
} from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import AppsDeleteIcon from "@crema/core/AppsDeleteIcon";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AppTooltip from "@crema/core/AppTooltip";
import { StyledBox } from "./index.style";
import { AppState } from "../../../../../redux/store";
import { LabelObj } from "types/models/apps/Todo";

interface CheckedTasksActionsProps {
  checkedTasks: number[];
  setCheckedTasks: (tasks: number[]) => void;
  page: number;
}

const CheckedTasksActions: React.FC<CheckedTasksActionsProps> = ({
  checkedTasks,
  setCheckedTasks,
  page,
}) => {
  const { folder, label }: { folder: string; label: string } = useParams();
  const dispatch = useDispatch();
  const [isLabelOpen, onOpenLabel] = React.useState(null);

  const { labelList }: { labelList: LabelObj[] } = useSelector<
    AppState,
    AppState["todoApp"]
  >(({ todoApp }) => todoApp);

  const onLabelOpen = (event: any) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onDeleteTasks = () => {
    if (folder)
      dispatch(onDeleteSelectedTasks(checkedTasks, "folder", folder, page));
    if (label)
      dispatch(onDeleteSelectedTasks(checkedTasks, "label", label, page));

    setCheckedTasks([]);
  };

  const onSelectLabel = (event: any) => {
    const labelType = event.target.value;
    dispatch(onUpdateTaskLabels(checkedTasks, labelType));
    setCheckedTasks([]);
    onLabelClose();
  };

  return (
    <>
      <StyledBox component="span">
        <Box component="span">
          <AppsDeleteIcon
            deleteAction={onDeleteTasks}
            deleteTitle={<IntlMessages id="todo.deleteMessage" />}
            sx={{
              cursor: "pointer",
              color: "text.disabled",
            }}
          />
        </Box>

        <Box component="span">
          <AppTooltip title={<IntlMessages id="common.label" />}>
            <IconButton
              sx={{
                color: "text.disabled",
                cursor: "pointer",
                display: "block",
              }}
              onClick={onLabelOpen}
              size="large"
            >
              <LabelOutlinedIcon />
            </IconButton>
          </AppTooltip>
        </Box>
      </StyledBox>
      <Menu
        anchorEl={isLabelOpen}
        open={Boolean(isLabelOpen)}
        onClose={onLabelClose}
      >
        {labelList.map((label) => {
          return (
            <MenuItem
              key={label.id}
              sx={{ p: "8px !important" }}
              value={label.id}
              onClick={onSelectLabel}
            >
              {label.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CheckedTasksActions;
