import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { customTheme } from './MUI/theme';

function App() {
  return (
        <ThemeProvider theme={customTheme("light")}>
            <CssBaseline/>
            <div>
              <RouterProvider router={router}/>
            </div>
          
        </ThemeProvider>  );
}

export default App;
