import React from "react";
import ListItem from "@mui/material/ListItem";
import { useHistory, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import clsx from "clsx";
import Priority from "./Priority";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { TodoObj } from "types/models/apps/Todo";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 20px 4px 20px",
  overflow: "hidden",
  display: "flex",
  alignItems: "flex-start",
  cursor: "pointer",
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  "&.checked": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
  },
  "& .labelIcon": {
    transform: "translateX(60px)",
    transition: "all 0.5s ease",
    display: "flex",
    alignItems: "center",
  },
}));

const UserInfoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    width: "75%",
  },
}));
const TaskActionView = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "20%",
  paddingLeft: 12,

  [theme.breakpoints.up("sm")]: {
    width: "25%",
  },
}));

interface TaskListItemProps {
  task: TodoObj;
  checkedTasks: number[];
  onChangeStarred: (checked: boolean, task: TodoObj) => void;
}

const TaskListItemMobile: React.FC<TaskListItemProps> = ({
  task,
  checkedTasks,
  onChangeStarred,
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
      <UserInfoWrapper>
        <Box mr={3.5} mt={1}>
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
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                mb: 1.5,
                mr: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              component="p"
            >
              {task.title}
            </Box>

            <Priority priority={task.priority} />
          </Box>

          <Typography
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.content}
          </Typography>
        </Box>
      </UserInfoWrapper>

      <TaskActionView>
        <Box
          component="span"
          sx={{
            color: "text.secondary",
            fontSize: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            transition: "all 0.5s ease",
          }}
        >
          {moment(task.startDate).format("HH:mm A")}
        </Box>
        <Box
          mt="auto"
          component="span"
          onClick={(event: any) => event.stopPropagation()}
        >
          <AppsStarredIcon item={task} onChange={onChangeStarred} />
        </Box>
      </TaskActionView>
    </StyledListItem>
  );
};

export default TaskListItemMobile;
