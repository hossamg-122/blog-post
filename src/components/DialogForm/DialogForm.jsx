import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import { InputHandler } from "..";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const DialogForm = () => {
  const{ open, title, action,buttonText,initialValues } = useSelector((state)=>state.blog.dialogFormParams)
 
  const handleClose = () => {
    dispatcher({type:'dialogFormParams',payload:{open:false}})
  };
  
  const validate = Yup.object({
    body: Yup.string().required("required"),
  });
  const dispatcher = useDispatch();
  const handleSubmit = (values) => {
    dispatcher(action(values, handleClose));
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
