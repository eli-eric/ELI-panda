import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import TaskItem from "./TaskItem";
import AppList from "@crema/core/AppList";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import AppScrollbar from "@crema/core/AppScrollbar";
import { TaskListData } from "types/models/dashboards/Widgets";

const getData = (data: TaskListData[]) => {
  return data;
};

interface TaskListProps {
  data: TaskListData[];
}

const TaskList: React.FC<TaskListProps> = ({ data }) => {
  const taskData = getData(data);

  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["dashboard.taskList"]}
      contentStyle={{ px: 0 }}
      action={
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
        />
      }
    >
      <AppScrollbar
        sx={{
          height: 263,
        }}
      >
        <AppList
          data={taskData}
          renderRow={(item) => {
            return <TaskItem key={item.id} item={item} />;
          }}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default TaskList;
