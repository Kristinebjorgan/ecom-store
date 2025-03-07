import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccessPage = () => {
  return (
    <div>
      <h1>🎉 Order Successful!</h1>
      <p>Thank you for your purchase.</p>

      <Link to="/">← Back to Store</Link>
    </div>
  )
}

export default CheckoutSuccessPage
