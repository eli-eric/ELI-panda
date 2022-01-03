import React from "react";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Form } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { styled } from "@mui/material/styles";
import { AppState } from "../../../../redux/store";
import { LabelObj, PriorityObj, StaffObj } from "types/models/apps/Todo";

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up("xl")]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

interface AddTaskFormProps {
  values: any;
  setFieldValue: (name: string, value: any) => void;
  isSubmitting: boolean;
  setTaskLabels: (value: LabelObj[]) => void;
  taskLabels: LabelObj[];
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  values,
  setFieldValue,
  isSubmitting,
  setTaskLabels,
  taskLabels,
}) => {
  const {
    labelList,
    priorityList,
    staffList,
  }: {
    labelList: LabelObj[];
    priorityList: PriorityObj[];
    staffList: StaffObj[];
  } = useSelector<AppState, AppState["todoApp"]>(({ todoApp }) => todoApp);

  const inputLabel = React.useRef(null);

  const { messages } = useIntl();

  return (
    <Form
      style={{
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <AppTextField
          sx={{
            width: "100%",
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant="outlined"
          label={<IntlMessages id="todo.taskTitle" />}
          name="title"
        />

        <Box mb={5}>
          <AppGridContainer spacing={5}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                sx={{
                  width: "100%",

                  "& .MuiOutlinedInput-input": {
                    paddingTop: 2,
                    paddingBottom: 1.5,
                    minHeight: 42,
                  },
                }}
                variant="outlined"
              >
                <InputLabel
                  ref={inputLabel}
                  id="assigned-to-select-outlined-label"
                >
                  <IntlMessages id="common.staff" />
                </InputLabel>
                <Select
                  labelId="assigned-to-select-outlined-label"
                  name="assignedTo"
                  label={<IntlMessages id="common.staff" />}
                  onChange={(event) =>
                    setFieldValue("assignedTo", event.target.value)
                  }
                  sx={{
                    width: "100%",
                  }}
                >
                  {staffList.map((staff) => {
                    return (
                      <MenuItem
                        value={staff.id}
                        key={staff.id}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          {staff.image ? (
                            <Avatar
                              sx={{
                                marginRight: 2,
                              }}
                              src={staff.image}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                marginRight: 2,
                              }}
                            >
                              {staff.name.toUpperCase()}
                            </Avatar>
                          )}
                          <span>{staff.name}</span>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box width={1}>
                <DatePicker
                  label={<IntlMessages id="common.startDate" />}
                  value={values.date}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(value) => setFieldValue("date", value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                sx={{
                  width: "100%",
                }}
                variant="outlined"
              >
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  <IntlMessages id="common.priority" />
                </InputLabel>
                <Select label="priority" name="priority">
                  {priorityList.map((priority) => {
                    return (
                      <MenuItem
                        value={priority.type}
                        key={priority.id}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {priority.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={labelList}
                getOptionLabel={(option) => option.name}
                value={taskLabels}
                onChange={(event, value) => setTaskLabels(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={<IntlMessages id="common.label" />}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </AppGridContainer>
        </Box>

        <Box mb={5}>
          <AppTextField
            name="content"
            multiline
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              color: "text.primary",
            }}
            rows="6"
            variant="outlined"
            placeholder={messages["common.description"] as string}
          />
        </Box>

        <StyledDivider />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          sx={{
            position: "relative",
            minWidth: 100,
          }}
          color="primary"
          variant="outlined"
          disabled={isSubmitting}
          type="submit"
        >
          <IntlMessages id="common.save" />
        </Button>
      </div>
    </Form>
  );
};

export default AddTaskForm;
