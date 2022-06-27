import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { InputHandler } from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const handleSubmit = (event) => {};
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const validate = Yup.object({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
  });
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formValues) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputHandler
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputHandler
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputHandler
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputHandler
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          Atomica, All rights reserved
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};
