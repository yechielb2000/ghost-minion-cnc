import AgentsPage from './pages/AgentsPage';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AgentDetailsPage from './pages/AgentDetailsPage';
import AgentTasksPage from './pages/AgentTasksPage';


function App() {
  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>

          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/agents" replace />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/agents/:id" element={<AgentDetailsPage />} />
              <Route path="/agents/:id/tasks" element={<AgentTasksPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </React.StrictMode>
  )
}

export default App
