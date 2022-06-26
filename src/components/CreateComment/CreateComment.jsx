import React from "react";
import { Button, IconButton, Avatar } from "@mui/material";

import { Form, Formik } from "formik";
import { InputHandler } from "../";
import { Profile } from "../";
import * as Yup from "yup";
export const CreateComment = () => {
  const initialValues = {
    body: "",
  };
  const validate = Yup.object({
    body: Yup.string().required("required"),
  });
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formValues) => (
        <Form>
          <InputHandler
            placeholder="Add a comment..."
            name="body"
            fullWidth
            variant="outlined"
            autoFocus={false}
            multiline
            InputProps={{
              endAdornment: (
                <Button type="submit" variant="contained" size="small" sx={{textTransform:'capitalize'}} >
                  Comment
                </Button>
              ),
              startAdornment: (
                <IconButton sx={{ p: 0, mr: 2 }}>
                  <Profile />
                </IconButton>
              ),
            }}
          />
        </Form>
      )}
    </Formik>
  );
};
