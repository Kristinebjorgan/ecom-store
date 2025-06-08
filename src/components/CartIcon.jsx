import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext' //

const CartIcon = () => {
  const { cartCount } = useContext(CartContext)
  return (
    <Link
      to="/cart"
      style={{ position: 'relative', textDecoration: 'none' }}
    >
      CART
      {cartCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '4px 8px',
            fontSize: '12px',
          }}
        >
          {cartCount} {}
        </span>
      )}
    </Link>
  )
}

export default CartIcon
