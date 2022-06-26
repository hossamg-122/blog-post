import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { Home } from "./pages";
import { Navbar } from "./components";
import { Footer } from "./components";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { mode } = useSelector((state) => state.blog);
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
        <Container maxWidth="sm" component='main' sx={{display:'flex',flexDirection:'column',height:'90vh'}}>
          <Home />
          <Footer />
        </Container>

        
      </ThemeProvider>
    </div>
  );
}

export default App;
