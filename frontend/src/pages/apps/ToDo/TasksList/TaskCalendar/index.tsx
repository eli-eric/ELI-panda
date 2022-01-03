import React, { useState } from "react";
import { momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import AddNewTask from "../../AddNewTask";
import { StyledCalendar } from "./Calendar.style";
import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./calendar.css";
import AppTooltip from "../../../../../@crema/core/AppTooltip";
import CustomToolbar from "./CustomToolbar";
import { AppState } from "../../../../../redux/store";
import { TodoObj } from "types/models/apps/Todo";

const localizer = momentLocalizer(moment);
// import {useHistory, useParams} from 'react-router-dom';
// import {Box} from '@mui/material';

// const getListData = (value, data) => {
//   let listData = [];
//   data.map((task) => {
//     if (
//       value.format('MM-DD-YYYY') ===
//       moment(task.scheduleDate).format('MM-DD-YYYY')
//     ) {
//       listData = listData.concat({
//         color: task.priority ? task.priority.color : '#7c7c7c',
//         title: task.title,
//         id: task.id,
//       });
//     }
//   });
//
//   return listData || [];
// };

const TaskCalender = () => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const { taskList }: { taskList: TodoObj[] } = useSelector<
    AppState,
    AppState["todoApp"]
  >(({ todoApp }) => todoApp);

  const history = useHistory();
  const { folder, label }: { folder: string; label: string } = useParams();
  console.log("taskList:", taskList);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onSelectDate = (info: SlotInfo) => {
    setSelectedDate(info.start as string);
    setAddTaskOpen(true);
  };

  const onOpenAddTask = () => {
    if (selectedDate) {
      setAddTaskOpen(true);
    } else {
      setAddTaskOpen(false);
    }
  };

  const onViewTaskDetail = (task: TodoObj) => {
    if (folder) history.push(`/apps/todo/${folder}/${task.id}`);
    if (label) history.push(`/apps/todo/label/${label}/${task.id}`);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  const getEvents = () => {
    if (taskList?.length > 0)
      return taskList.map((task) => {
        return {
          ...task,
          title: task.title,
          start: task.startDate,
          end: task.startDate,
          allDay: true,
        };
      });
    return [];
  };
  return (
    <>
      <StyledCalendar
        localizer={localizer}
        events={getEvents()}
        views={["month", "agenda"]}
        showMultiDayTimes
        selectable
        onSelectEvent={(e) => onViewTaskDetail(e as TodoObj)}
        components={{
          toolbar: CustomToolbar,
          event: (item) => (
            <AppTooltip title={item.title}>
              <Box
                sx={{
                  borderRadius: 10,
                  px: 2.5,
                  py: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Box>
            </AppTooltip>
          ),
        }}
        popup
        onSelectSlot={onSelectDate}
        defaultView="month"
      />

      {isAddTaskOpen ? (
        <AddNewTask
          selectedDate={selectedDate}
          onOpenAddTask={onOpenAddTask}
          onCloseAddTask={onCloseAddTask}
          isAddTaskOpen={isAddTaskOpen}
        />
      ) : null}
    </>
  );
};
export default TaskCalender;
