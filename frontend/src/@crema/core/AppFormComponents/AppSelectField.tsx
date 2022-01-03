import React from "react";
import { FieldHookConfig, useField } from "formik";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { SelectProps } from "@mui/material/Select/Select";

const AppSelectField = (props: SelectProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <>
      <Select {...props} {...field} error={!!errorText} />
      {!props.disabled && (
        <FormHelperText style={{ color: "#f44336" }}>
          {errorText}
        </FormHelperText>
      )}
    </>
  );
};

export default AppSelectField;
