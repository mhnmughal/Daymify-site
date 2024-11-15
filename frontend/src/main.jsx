import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context API/Contextapi.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>  {/*wraped the app inside the contextprovide api funtion so now api have access of the whole app */}
      {/*app is now the children of context api */}
      <App />
    </ContextProvider>
  </StrictMode>,
)
