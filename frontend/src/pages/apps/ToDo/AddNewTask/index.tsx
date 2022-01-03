import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { onCreateTask } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import IntlMessages from "@crema/utility/IntlMessages";
import AddTaskForm from "./AddTaskForm";
import AppDialog from "@crema/core/AppDialog";
import { useAuthUser } from "@crema/utility/AuthHooks";
import { LabelObj } from "types/models/apps/Todo";

interface AddNewTaskProps {
  isAddTaskOpen: boolean;
  onOpenAddTask?: () => void;
  onCloseAddTask: () => void;
  selectedDate?: string | null;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({
  isAddTaskOpen,
  onOpenAddTask,
  onCloseAddTask,
  selectedDate,
}) => {
  console.log("selectedDate: ", selectedDate);
  const dispatch = useDispatch();

  const { user } = useAuthUser();

  const [taskLabels, setTaskLabels] = useState<LabelObj[]>([]);

  const validationSchema = yup.object({
    title: yup
      .string()
      .required(String(<IntlMessages id="validation.titleRequired" />)),
  });

  return (
    <AppDialog
      dividers
      maxWidth="md"
      open={isAddTaskOpen}
      onClose={() => onCloseAddTask()}
      title={<IntlMessages id="todo.addNewTask" />}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          title: "",
          assignedTo: "",
          label: [],
          priority: 3,
          date: selectedDate
            ? moment(selectedDate).format("MM/DD/YYYY")
            : moment().format("MM/DD/YYYY"),
          content: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const newTask = {
            id: Math.floor(Math.random() * 1000000),
            isStarred: false,
            isAttachment: false,
            isRead: true,
            folderValue: 120,
            createdBy: {
              name: user.displayName ? user.displayName : "User",
              image: user.photoURL,
            },
            startDate: moment(data.date).format("lll"),
            image: "/assets/images/dummy2.jpg",
            createdOn: moment().format("ll"),
            status: 1,
            comments: [],
            ...data,
            label: taskLabels,
          };
          console.log("newTask:***********", newTask);
          dispatch(onCreateTask(newTask));
          onCloseAddTask();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <AddTaskForm
            isSubmitting={isSubmitting}
            values={values}
            setFieldValue={setFieldValue}
            setTaskLabels={setTaskLabels}
            taskLabels={taskLabels}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default AddNewTask;
