import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import MyFormsPage from './pages/MyFormsPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/create" replace />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/preview" element={<PreviewForm />} />
            <Route path="/myforms" element={<MyFormsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
