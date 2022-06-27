import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navbar } from "./components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./router/Router";
import { validateUser } from "./store/actions";
import { Box } from "@mui/material";
function App() {
  const { mode } = useSelector((state) => state.blog);
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(validateUser());
  }, []);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor='background.default' >
        <ToastContainer />
        <Navbar />
        <Router />
      </Box>
    </ThemeProvider>
  );
}

export default App;
