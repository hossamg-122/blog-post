import React from "react";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { InputHandler, Profile } from "../";
import * as Yup from "yup";
import { createComment } from "../../store/actions";
export const CreateComment = ({ post }) => {
  const dispatcher = useDispatch();
  const initialValues = {
    body: "",
  };
  const validate = Yup.object({
    body: Yup.string().required("required"),
  });
  const handleSubmit = (values) => {
    const { id } = post;
    const requiredData = {
      ...values,
      postId: id,
      name: "Hossam Gamal",
      email: "hossamg@atomica.ai",
    };
    dispatcher(createComment(requiredData));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {(formValues) => (
        <Form>
          {/* this is a generic component for TextField Input  */}
          <InputHandler
            placeholder="Add a comment..."
            name="body"
            fullWidth
            variant="outlined"
            autoFocus={false}
            multiline
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "capitalize", px: 2 }}
                >
                  Comment
                </Button>
              ),
              startAdornment: (
                <IconButton sx={{ p: 0, mr: 2 }}>
                  {/* this is a generic component for user profile */}
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
