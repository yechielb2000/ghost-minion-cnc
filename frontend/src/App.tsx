import AgentsPage from './pages/AgentsPage';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles'

function App() {


  return (
    <ThemeProvider theme={theme}>
      <>
        <AgentsPage />
      </>
    </ThemeProvider>
  )
}

export default App
