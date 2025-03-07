import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    // checkoutprocess
    alert('Order placed successfully!')

    // Clear the cart 
    clearCart()
    navigate('/checkout-success')
  }

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Total: ${getTotalPrice().toFixed(2)}</h2>

      <button onClick={handleCheckout}>Place Order</button>
      <br />
      <Link to="/cart">← Back to Cart</Link>
    </div>
  )
}

export default CheckoutPage
