import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </ThemeProvider> */}
    </Provider>
  </StrictMode>,
)
