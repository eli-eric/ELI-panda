import React from "react";
import { Checkbox, Hidden } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import clsx from "clsx";
import Labels from "./Labels";
import Priority from "./Priority";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import Avatar from "@mui/material/Avatar";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ActionWrapper, StyledListItem, TaskInfoWrapper } from "./index.style";
import { TodoObj } from "types/models/apps/Todo";

interface TaskListItemProps {
  task: TodoObj;
  onChangeCheckedTasks: (event: any, taskId: number) => void;
  checkedTasks: number[];
  onChangeStarred: (checked: boolean, task: TodoObj) => void;
  onDeleteTask: (task: TodoObj) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onChangeCheckedTasks,
  checkedTasks,
  onChangeStarred,
  onDeleteTask,
}) => {
  const history = useHistory();
  const { folder, label }: { folder: string; label: string } = useParams();

  const onViewTaskDetail = (task: TodoObj) => {
    if (folder) history.push(`/apps/todo/${folder}/${task.id}`);
    if (label) history.push(`/apps/todo/label/${label}/${task.id}`);
  };

  return (
    <StyledListItem
      dense
      key={task.id}
      className={clsx("item-hover", {
        checked: checkedTasks.includes(task.id),
      })}
      onClick={() => onViewTaskDetail(task)}
    >
      <TaskInfoWrapper>
        <span onClick={(event) => event.stopPropagation()}>
          <Checkbox
            sx={{
              color: "text.disabled",
            }}
            checked={checkedTasks.includes(task.id)}
            onChange={(event) => onChangeCheckedTasks(event, task.id)}
            color="primary"
          />
        </span>

        <Box
          mr={2.5}
          component="span"
          onClick={(event: any) => event.stopPropagation()}
        >
          <AppsStarredIcon item={task} onChange={onChangeStarred} />
        </Box>
        <Box mr={3.5}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
            src={task.assignedTo.image}
            alt={task.assignedTo.name}
          />
        </Box>

        <Box
          component="p"
          sx={{
            mr: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.title}
        </Box>

        <Hidden mdDown>
          <Priority priority={task.priority} />
        </Hidden>
      </TaskInfoWrapper>

      <ActionWrapper>
        <Hidden mdDown>
          <Labels labels={task.label} />
        </Hidden>

        <Box
          className="task-list-schedule"
          component="span"
          sx={{
            ml: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            transition: "all 0.5s ease",
            transform: "translateX(60px)",
          }}
        >
          <IntlMessages id="todo.scheduleFor" /> {task.startDate}
        </Box>
        <Box className="labelAction">
          <LabelOutlinedIcon onClick={(e) => e.stopPropagation()} />
          <DeleteOutlinedIcon
            onClick={(e) => {
              onDeleteTask(task);
              e.stopPropagation();
            }}
          />
        </Box>
      </ActionWrapper>
    </StyledListItem>
  );
};

export default TaskListItem;
