import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext' // ✅ Import CartProvider
import './index.css'
import './styles/styles.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      {' '}
      {/* ✅ Wrap everything inside CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>
)
