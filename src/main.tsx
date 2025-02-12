import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import AllContextProvider from './context/AllContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllContextProvider>
      <App />
    </AllContextProvider>
  
  </StrictMode>,
)
