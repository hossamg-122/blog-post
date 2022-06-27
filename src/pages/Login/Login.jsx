import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form } from "formik";
import { InputHandler } from "../../components";
import * as Yup from "yup";
import { login } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatcher = useDispatch();
  const router = useNavigate();
  const handleSubmit = (values) => {
    dispatcher(login(values, router));
  };
  const initialValues = {
    email: "",
    password: "",
    rememberMe: true,
  };
  const validate = Yup.object({
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
  });
  return (
    <Grid
      container
      component="main"
      sx={{ height: "calc(100vh - 64px)", mt: 7 }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://uploads-ssl.webflow.com/61ee9cca05ba9c8904f691d2/6214e068a73956419450a23f_about11.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(formValues) => (
                <Form>
                  <InputHandler
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    margin="normal"
                    autoFocus
                  />
                  <InputHandler
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    margin="normal"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        name="rememberMe"
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>

            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
