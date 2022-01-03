import React from "react";
import Checkbox from "@mui/material/Checkbox/index";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import AppSearchBar from "@crema/core/AppSearchBar";
import SelectTasksDropdown from "./SelectTasksDropdown";
import CheckedTasksActions from "./CheckedTasksActions";
import AppsPagination from "@crema/core/AppsPagination";
import Hidden from "@mui/material/Hidden";
import ViewSelectButtons from "./ViewSelectButtons";
import { AppState } from "../../../../../redux/store";
import { TodoObj } from "../../../../../types/models/apps/Todo";

interface TaskContentHeaderProps {
  checkedTasks: number[];
  setCheckedTasks: (checkedTasks: number[]) => void;
  filterText: string;
  onSetFilterText: (text: string) => void;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onViewModeSelect: (mode: string) => void;
  viewMode: string;
  page: number;
}

const TaskContentHeader: React.FC<TaskContentHeaderProps> = ({
  checkedTasks,
  setCheckedTasks,
  onViewModeSelect,
  filterText,
  viewMode,
  onSetFilterText,
  onPageChange,
  page,
}) => {
  const { taskList, totalTasks }: { taskList: TodoObj[]; totalTasks: number } =
    useSelector<AppState, AppState["todoApp"]>(({ todoApp }) => todoApp);

  const onHandleMasterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const taskIds = taskList.map((task) => task.id);
      setCheckedTasks(taskIds);
    } else {
      setCheckedTasks([]);
    }
  };

  const onSelectTasks = (value: number) => {
    switch (value) {
      case 0:
        setCheckedTasks(taskList.map((task) => task.id));
        break;
      case 1:
        setCheckedTasks([]);
        break;

      case 2:
        setCheckedTasks(
          taskList.filter((task) => task.isStarred).map((task) => task.id)
        );
        break;

      case 3:
        setCheckedTasks(
          taskList.filter((task) => task.isAttachment).map((task) => task.id)
        );
        break;

      default:
        setCheckedTasks([]);
    }
  };

  const { messages } = useIntl();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <span>
          <Checkbox
            sx={{
              color: "text.disabled",
            }}
            indeterminate={
              checkedTasks.length > 0 && checkedTasks.length < taskList.length
            }
            checked={
              taskList.length > 0 && checkedTasks.length === taskList.length
            }
            onChange={onHandleMasterCheckbox}
          />
        </span>
        <Box sx={{ mr: 3 }}>
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            value={filterText}
            onChange={(event: any) => onSetFilterText(event.target.value)}
            placeholder={messages["common.searchHere"] as string}
          />
        </Box>
        <SelectTasksDropdown
          onSelectTasks={onSelectTasks}
          checkedTasks={checkedTasks}
        />
        {checkedTasks.length > 0 ? (
          <Box
            component="span"
            sx={{
              mr: { sm: 4 },
              display: "flex",
            }}
          >
            <CheckedTasksActions
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              page={page}
            />
          </Box>
        ) : null}
      </Box>

      <Box
        sx={{
          mr: { xs: 3, xl: 4 },
        }}
      >
        <ViewSelectButtons
          viewMode={viewMode}
          onViewModeSelect={onViewModeSelect}
        />
      </Box>

      <Hidden smDown>
        {taskList.length > 0 ? (
          <AppsPagination
            sx={{
              paddingRight: 2,
              paddingLeft: 2,
              "& .MuiToolbar-root": {
                paddingLeft: 0,
              },
              "& .MuiTablePagination-actions": {
                marginLeft: 0,
                "& .MuiButtonBase-root": {
                  padding: 2,
                },
              },
            }}
            count={totalTasks}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>
    </>
  );
};

export default TaskContentHeader;
