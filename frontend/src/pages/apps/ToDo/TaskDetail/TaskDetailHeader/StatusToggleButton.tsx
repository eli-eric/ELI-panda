import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import IntlMessages from "@crema/utility/IntlMessages";
import { onUpdateSelectedTask } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { TodoObj } from "types/models/apps/Todo";

const StatusButton = styled(Button)(({ theme }) => ({
  fontSize: 12,
  [theme.breakpoints.up("lg")]: {
    fontSize: 14,
  },
}));

const StyledDoneIcon = styled(DoneIcon)(({ theme }) => ({
  marginRight: 4,
  fontSize: 18,
  verticalAlign: "middle",
  [theme.breakpoints.up("sm")]: {
    marginRight: 8,
  },
}));

interface StatusToggleButtonProps {
  selectedTask: TodoObj;
}

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({
  selectedTask,
}) => {
  const dispatch = useDispatch();

  const onChangeTaskStatus = (status: number) => {
    const task = selectedTask;
    task.status = status;
    dispatch(onUpdateSelectedTask(task));
  };

  return (
    <>
      {selectedTask.status === 3 ? (
        <StatusButton
          variant="contained"
          color="primary"
          startIcon={<StyledDoneIcon />}
          onClick={() => onChangeTaskStatus(1)}
        >
          <IntlMessages id="todo.completed" />
        </StatusButton>
      ) : (
        <StatusButton
          variant="outlined"
          color="primary"
          startIcon={<StyledDoneIcon />}
          onClick={() => onChangeTaskStatus(3)}
        >
          <IntlMessages id="todo.markAsCompleted" />
        </StatusButton>
      )}
    </>
  );
};

export default StatusToggleButton;
