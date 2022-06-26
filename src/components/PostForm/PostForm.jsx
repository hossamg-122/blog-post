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
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { InputHandler } from "../";
import * as Yup from "yup";

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

export const PostForm = ({ title, open, handleClose, buttonText,initialValues }) => {
    const initialValues ={body:initialValues?.body?initialValues.body:""} 
    const validate = Yup.object({
        body: Yup.string().required("required"),
        affect: Yup.string().required("required"),
      });
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

        <DialogContent dividers>
          <Formik>
            {(formValues) => (
              <Form>
                <InputHandler
                  placeholder="Please enter text"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  autoFocus={false}
                />
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {buttonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
