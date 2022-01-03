import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import IntlMessages from "@crema/utility/IntlMessages";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateSelectedTask } from "../../../../../redux/actions";
import { MenuItem } from "@mui/material";
import { AppState } from "../../../../../redux/store";
import { PriorityObj, TodoObj } from "../../../../../types/models/apps/Todo";

interface TaskPriorityProps {
  selectedTask: TodoObj;
}

const TaskPriority: React.FC<TaskPriorityProps> = ({ selectedTask }) => {
  const dispatch = useDispatch();
  const { priorityList }: { priorityList: PriorityObj[] } = useSelector<
    AppState,
    AppState["todoApp"]
  >(({ todoApp }) => todoApp);

  const [priority, setPriority] = useState<PriorityObj>(selectedTask.priority);

  const onChangePriority = (event: SelectChangeEvent<PriorityObj>) => {
    const priority = priorityList.find(
      (data) => data.type.toString() === event.target.value.toString()
    );

    const task = selectedTask;
    task.priority = priority as PriorityObj;
    setPriority(priority as PriorityObj);
    dispatch(onUpdateSelectedTask(task));
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="priority-select-outlined-label">
        <IntlMessages id="common.priority" />
      </InputLabel>
      <Select
        labelId="priority-select-outlined-label"
        label={<IntlMessages id="common.priority" />}
        name="priority"
        value={priority}
        onChange={(event) => onChangePriority(event)}
        sx={{
          cursor: "pointer",
          "& .MuiOutlinedInput-input": {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
      >
        {priorityList.map((priority) => {
          return (
            <MenuItem
              key={priority.id}
              value={priority.type}
              sx={{
                padding: 2,
                cursor: "pointer",
              }}
            >
              {priority.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskPriority;
