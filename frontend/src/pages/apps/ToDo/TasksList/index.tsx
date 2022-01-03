import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetTaskList,
  onUpdateSelectedTask,
  onUpdateTaskStarredStatus,
} from "../../../../redux/actions";
import TaskContentHeader from "./TaskContentHeader";
import TaskListItem from "./TaskListItem";
import { useParams } from "react-router-dom";
import AddNewTask from "../AddNewTask";
import { Hidden } from "@mui/material";
import AppsPagination from "@crema/core/AppsPagination";
import AppsHeader from "@crema/core/AppsContainer/AppsHeader";
import AppsContent from "@crema/core/AppsContainer/AppsContent";
import AppsFooter from "@crema/core/AppsContainer/AppsFooter";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import TodoListSkeleton from "@crema/core/AppSkeleton/TodoListSkeleton";
import AppList from "@crema/core/AppList";
import TaskListItemMobile from "./TaskListItemMobile";
import TaskCalender from "./TaskCalendar";
import { AppState } from "../../../../redux/store";
import { TodoObj } from "types/models/apps/Todo";

export const ViewMode = {
  List: "list",
  Calendar: "calendar",
};
const TasksList = () => {
  const dispatch = useDispatch();

  const { folder, label }: { folder: string; label: string } = useParams();

  const {
    taskList,
    totalTasks,
    loading,
  }: { taskList: TodoObj[]; totalTasks: number; loading: boolean } =
    useSelector<AppState, AppState["todoApp"]>(({ todoApp }) => todoApp);

  const [viewMode, setViewMode] = useState<string>(ViewMode.List);
  const [filterText, onSetFilterText] = useState<string>("");
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
    if (folder) dispatch(onGetTaskList("folder", folder, page));
    if (label) dispatch(onGetTaskList("label", label, page));
  }, [dispatch, page, folder, label]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    setPage(value);
  };

  const onChangeCheckedTasks = (event: any, id: number) => {
    if (event.target.checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
  };

  const onChangeStarred = (checked: boolean, task: TodoObj) => {
    if (folder)
      dispatch(onUpdateTaskStarredStatus(task.id.toString(), checked, folder));
    if (label)
      dispatch(onUpdateTaskStarredStatus(task.id.toString(), checked, label));
  };

  const onGetFilteredItems = () => {
    if (filterText === "") {
      return taskList;
    } else {
      return taskList.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };
  const onDeleteTask = (task: TodoObj) => {
    task.folderValue = 126;
    dispatch(onUpdateSelectedTask(task));
  };

  const list = onGetFilteredItems();

  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          viewMode={viewMode}
          onViewModeSelect={setViewMode}
          onPageChange={onPageChange}
          page={page}
        />
      </AppsHeader>
      <AppsContent>
        {viewMode === ViewMode.Calendar ? (
          <TaskCalender />
        ) : (
          <>
            <Hidden smDown>
              <AppList
                data={list}
                renderRow={(task) => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onChangeCheckedTasks={onChangeCheckedTasks}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                    onDeleteTask={onDeleteTask}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={loading}
                    actionTitle="Add Task"
                    onClick={onOpenAddTask}
                    placeholder={<TodoListSkeleton />}
                  />
                }
              />
            </Hidden>

            <Hidden smUp>
              <AppList
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                data={list}
                renderRow={(task) => (
                  <TaskListItemMobile
                    key={task.id}
                    task={task}
                    // labelList={labelList}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={loading}
                    actionTitle="Add Task"
                    onClick={onOpenAddTask}
                    placeholder={<TodoListSkeleton />}
                  />
                }
              />
            </Hidden>
          </>
        )}
      </AppsContent>

      <Hidden smUp>
        {taskList.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalTasks}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};

export default TasksList;
