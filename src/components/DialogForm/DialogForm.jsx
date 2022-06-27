import * as React from "react";
import {
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import { InputHandler } from "..";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_POST,
  EDIT_COMMENT,
  EDIT_POST,
} from "../../store/actions/types";
import { createPost, updateComment, updatePost } from "../../store/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
// this a generic component for handling create and edit post or comment
export const DialogForm = () => {
  // this component is fully controlled from redux
  const { open, title, action, buttonText, initialValues } = useSelector(
    (state) => state.blog.dialogFormParams
  );

  const handleClose = () => {
    dispatcher({ type: "dialogFormParams", payload: { open: false } });
  };

  const validate = Yup.object({
    body: Yup.string().required("required"),
  });
  const dispatcher = useDispatch();
  const handleSubmit = (values) => {
    switch (action) {
      case CREATE_POST:
        dispatcher(createPost(values, handleClose));
        break;
      case EDIT_POST:
        dispatcher(updatePost(values, handleClose));
        break;
      case EDIT_COMMENT:
        dispatcher(updateComment(values, handleClose));
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formValues) => (
            <Form>
              <DialogContent dividers>
                {/* this is a generic component for TextField Input  */}
                <InputHandler
                  placeholder="Please enter text"
                  name="body"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  autoFocus={false}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" autoFocus>
                  {buttonText}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </BootstrapDialog>
    </div>
  );
};
