import AgentsPage from './pages/AgentsPage';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from 'react';


function App() {
  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <AgentsPage />
        </ThemeProvider>
      </LocalizationProvider>
    </React.StrictMode>
  )
}

export default App
