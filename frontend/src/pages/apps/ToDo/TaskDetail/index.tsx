import React, { useEffect } from "react";
import TaskDetailHeader from "./TaskDetailHeader";
import TaskDetailBody from "./TaskDetailBody";
import { useDispatch, useSelector } from "react-redux";
import { onGetSelectedTask } from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import AppsHeader from "@crema/core/AppsContainer/AppsHeader";
import AppsContent from "@crema/core/AppsContainer/AppsContent";
import { MailDetailSkeleton } from "@crema/core/AppSkeleton/MailDetailSkeleton";
import { AppState } from "../../../../redux/store";
import { TodoObj } from "types/models/apps/Todo";

const TaskDetail = () => {
  const dispatch = useDispatch();

  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(onGetSelectedTask(+id));
  }, [dispatch, id]);

  const { selectedTask }: { selectedTask: TodoObj } = useSelector<
    AppState,
    AppState["todoApp"]
  >(({ todoApp }) => todoApp);

  if (!selectedTask) {
    return <MailDetailSkeleton />;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader selectedTask={selectedTask} />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody selectedTask={selectedTask} />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
