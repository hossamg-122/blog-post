import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navbar } from "./components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./router/Router";
import { validateUser } from "./store/actions";
function App() {
  const { mode } = useSelector((state) => state.blog);
  const dispatcher = useDispatch()
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
    <div>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Navbar />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
