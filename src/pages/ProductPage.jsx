import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const ProductPage = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Product Data:', data)
        if (data && data.data) {
          setProduct(data.data) 
        } else {
          console.error('Unexpected API response:', data)
          setProduct(null)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching product:', error)
        setProduct(null)
        setLoading(false)
      })
  }, [id])

  if (loading) return <h2>Loading product details...</h2>
  if (!product) return <h2>Product not found.</h2>

  return (
    <div className="product-container">
      <h1>{product.title}</h1>
      <img
        src={product.image?.url || 'https://via.placeholder.com/200'} 
        alt={product.image?.alt || product.title}
        width="200"
      />
      <p>{product.description}</p>
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
      <button onClick={() => addToCart(product)}>Add to Cart</button>

      <h3>Reviews:</h3>
      {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
        <ul>
          {product.reviews.map((review, index) => (
            <li key={index}>
              {review.description} - ⭐ {review.rating}/5
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Leave yours</p>
      )}
      <br />
      <Link to="/">← Back</Link>
    </div>
  )
}

export default ProductPage
