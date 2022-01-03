import React from "react";
import { Field, FieldHookConfig } from "formik";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { DatePickerProps } from "@mui/lab/DatePicker/DatePicker";
import { TextFieldProps } from "@mui/material/TextField/TextField";

const AppDateFiled = (
  props: TextFieldProps & DatePickerProps & FieldHookConfig<string>
) => {
  return (
    <Field
      component={DatePicker}
      variant="outlined"
      inputVariant="outlined"
      format="YYYY-MM-DD"
      mask="____-__-__"
      autoOk
      {...props}
      renderInput={(params: any) => (
        <TextField className={props.className} {...params} />
      )}
    />
  );
};

export default AppDateFiled;
