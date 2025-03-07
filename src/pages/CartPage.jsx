import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext)

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image?.url} alt={product.title} width="100" />
              <h3>{product.title}</h3>
              <p>${product.discountedPrice}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          ))}

          <h2>Total: ${getTotalPrice().toFixed(2)}</h2>

          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}

      <br />
      <Link to="/">← Back to Store</Link>
    </div>
  )
}

export default CartPage
