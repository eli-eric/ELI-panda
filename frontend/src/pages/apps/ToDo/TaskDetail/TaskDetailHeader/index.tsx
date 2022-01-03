import React from "react";
import { useDispatch } from "react-redux";
import { onUpdateSelectedTask } from "../../../../../redux/actions";
import { useHistory } from "react-router-dom";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import StatusToggleButton from "./StatusToggleButton";
import AppsDeleteIcon from "@crema/core/AppsDeleteIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppTooltip from "@crema/core/AppTooltip";
import { TodoObj } from "types/models/apps/Todo";

interface TaskDetailHeaderProps {
  selectedTask: TodoObj;
}

const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({
  selectedTask,
}) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const onClickBackButton = () => {
    history.goBack();
  };

  const onChangeStarred = (checked: boolean) => {
    const task = selectedTask;
    task.isStarred = checked;
    dispatch(onUpdateSelectedTask(task));
  };

  const onDeleteTask = () => {
    const task = selectedTask;
    task.folderValue = 126;
    dispatch(onUpdateSelectedTask(task));
    history.goBack();
  };

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
        }}
        component="span"
        mr={{ xs: 2, sm: 4 }}
      >
        <AppTooltip title={<IntlMessages id="common.back" />}>
          <ArrowBackIcon
            sx={{
              color: "text.secondary",
            }}
            onClick={onClickBackButton}
          />
        </AppTooltip>
      </Box>

      <StatusToggleButton selectedTask={selectedTask} />

      <Box
        component="span"
        sx={{
          marginLeft: "auto",
          display: { xs: "none", sm: "block" },
        }}
      >
        <AppsStarredIcon item={selectedTask} onChange={onChangeStarred} />
      </Box>

      <AppsDeleteIcon
        deleteAction={onDeleteTask}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
        sx={{
          color: "text.disabled",
        }}
      />
    </>
  );
};

export default TaskDetailHeader;
