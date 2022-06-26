import React from 'react';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./App.css";
import { Home } from "./pages";
import { Navbar } from './components/Navbar';

function App() {
  const {mode} =useSelector((state)=>state.blog)
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
      }),
    [mode],
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
      <Home />
      </ThemeProvider>
     
      
    </div>
  );
}

export default App;
