import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './HomePage.jsx'
import App from './Router.jsx'
import EqBalancer from './EqBalancer.jsx'
import About from './About.jsx'
import ContactPage from './ContactPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EqBalancer/>
  </StrictMode>,
)