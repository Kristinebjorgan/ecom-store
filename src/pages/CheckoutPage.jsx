import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

/**
 * Checkout page where users place their order.
 */
const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    alert('Order placed successfully!')
    clearCart()
    navigate('/checkout-success')
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <h2>
        Total:{' '}
        <span className="font-semibold">
          ${Number(getTotalPrice()).toFixed(2)}
        </span>
      </h2>

      <button onClick={handleCheckout}>Place Order</button>

      <div className="mt-4">
        <Link to="/cart" className="text-link">
          ← Back to Cart
        </Link>
      </div>
    </section>
  )
}

export default CheckoutPage
