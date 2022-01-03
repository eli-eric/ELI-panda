import React from "react";
import InputLabel from "@mui/material/InputLabel";
import IntlMessages from "@crema/utility/IntlMessages";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateSelectedTask } from "../../../../../redux/actions";
import { MenuItem } from "@mui/material";
import { StatusObj, TodoObj } from "../../../../../types/models/apps/Todo";
import { AppState } from "../../../../../redux/store";

interface TaskStatusProps {
  selectedTask: TodoObj;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ selectedTask }) => {
  const { statusList }: { statusList: StatusObj[] } = useSelector<
    AppState,
    AppState["todoApp"]
  >(({ todoApp }) => todoApp);

  const dispatch = useDispatch();

  const onChangeStatus = (event: SelectChangeEvent<number>) => {
    const task = selectedTask;
    task.status = event.target.value as number;
    dispatch(onUpdateSelectedTask(task));
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="status-select-outlined-label">
        <IntlMessages id="common.status" />
      </InputLabel>
      <Select
        labelId="status-select-outlined-label"
        label={<IntlMessages id="common.status" />}
        value={selectedTask.status}
        onChange={(event) => onChangeStatus(event)}
        sx={{
          cursor: "pointer",
          "& .MuiOutlinedInput-input": {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
      >
        {statusList.map((status) => {
          return (
            <MenuItem
              key={status.type}
              value={status.type}
              sx={{
                padding: 2,
                cursor: "pointer",
              }}
            >
              {status.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskStatus;
