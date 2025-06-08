import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const ProductPage = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
        const data = await res.json()

        if (data?.data) {
          setProduct(data.data)
        } else {
          console.error('Unexpected API response:', data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <h2>Loading product details...</h2>
  if (!product) return <h2>Product not found.</h2>

  const { title, description, price, discountedPrice, image, reviews } = product
  const hasDiscount = discountedPrice < price
  const imageUrl = image?.url || 'https://via.placeholder.com/200'
  const imageAlt = image?.alt || title

  return (
    <div className="product-container">
      <h1>{title}</h1>

      <img src={imageUrl} alt={imageAlt} width="200" />

      <p>{description}</p>

      <p>
        {hasDiscount ? (
          <>
            <span style={{ textDecoration: 'line-through' }}>${price}</span>{' '}
            <strong>${discountedPrice}</strong>
          </>
        ) : (
          <strong>${price}</strong>
        )}
      </p>

      <button onClick={() => addToCart(product)}>Add to Cart</button>

      <section className="reviews">
        <h3>Reviews</h3>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id || `${review.rating}-${review.description}`}>
                {review.description} – ⭐ {review.rating}/5
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Leave yours.</p>
        )}
      </section>

      <Link to="/" className="back-link">
        ← Back
      </Link>
    </div>
  )
}

export default ProductPage
