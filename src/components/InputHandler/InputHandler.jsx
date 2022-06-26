import React from "react";
import { TextField } from "@mui/material";

import { ErrorMessage, useField } from "formik";

export const InputHandler = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        error={meta.touched && meta.error ? true : false}
        {...field}
        {...props}
        fullWidth={true}
        autoComplete="off"
        helperText={<ErrorMessage name={field.name} />}
      />
    </>
  );
};
