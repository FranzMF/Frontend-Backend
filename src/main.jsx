import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Importa los estilos globales y de vendor aquí
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/animsition/css/animsition.min.css';
import './assets/vendor/select2/select2.min.css';
import './assets/vendor/daterangepicker/daterangepicker.css';
import './assets/vendor/slick/slick.css';
import './assets/vendor/MagnificPopup/magnific-popup.css';
import './assets/vendor/perfect-scrollbar/perfect-scrollbar.css';

// Estilos de fuentes de iconos
import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './assets/fonts/iconic/css/material-design-iconic-font.min.css';
import './assets/fonts/linearicons-v1.0.0/icon-font.min.css';

// Tus estilos principales
import './assets/css/main.css';
import './assets/css/util.css';


import './assets/vendor/css-hamburgers/hamburgers.min.css'
import './assets/vendor/animate/animate.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
