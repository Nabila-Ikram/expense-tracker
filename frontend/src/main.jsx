import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from './context/ThemeProvider.jsx';
import PreferencesProvider from './context/PreferencesProvider.jsx';
import NotificationProvider from './context/NotificationProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <ThemeProvider>
     <PreferencesProvider>
      
     <NotificationProvider>
      <App />
    </NotificationProvider>
  </PreferencesProvider>
    </ThemeProvider>
  </BrowserRouter>
   </StrictMode>,
)
