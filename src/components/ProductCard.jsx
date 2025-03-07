import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      {/* */}
      <img
        src={product.image?.url}
        alt={product.image?.alt || product.title}
        width={150}
      />
      <p>
        {product.discountedPrice < product.price ? (
          <>
            <span style={{ textDecoration: 'line-through' }}>
              ${product.price}
            </span>{' '}
            <strong>${product.discountedPrice}</strong>
          </>
        ) : (
          <strong>${product.price}</strong>
        )}
      </p>
      <Link to={`/product/${product.id}`} className="view-button">
        View
      </Link>
    </div>
  )
}

export default ProductCard
