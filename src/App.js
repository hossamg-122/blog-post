import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Navbar } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./router/Router";
import { validateUser } from "./store/actions";
function App() {
  const { mode } = useSelector((state) => state.blog);
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(validateUser());
  }, []);
  // dark & light mode configuration
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
      <Box bgcolor="background.default">
        {/* this toastify to handle all the notifications in the app */}
        <ToastContainer />
        <Navbar />
        <Router />
      </Box>
    </ThemeProvider>
  );
}

export default App;
