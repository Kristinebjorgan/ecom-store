import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

/*** Cart page */
const CartPage = () => {
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext)

  return (
    <section className="cart-page">
      <header>
        <h1>CART</h1>
      </header>

      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map((product) => (
            <article key={product.id} className="cart-item">
              <img
                src={product.image?.url}
                alt={product.title || 'Product image'}
                width="100"
              />
              <div>
                <h3>{product.title}</h3>
                <p>${Number(product.discountedPrice).toFixed(2)}</p>
                <button onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}

          <h2 className="cart-total">Total: ${getTotalPrice().toFixed(2)}</h2>

          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}

      <div className="mt-6">
        <Link to="/" className="text-link">
          ← Back to Store
        </Link>
      </div>
    </section>
  )
}

export default CartPage
