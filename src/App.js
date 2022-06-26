import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { Home } from "./pages";
import { Navbar } from "./components";
import { Footer } from "./components";
import Container from "@mui/material/Container";

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
        <Navbar />
        <Container maxWidth="lg">
          <Home />
        </Container>

        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
