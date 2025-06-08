import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

/**
 * Homepage of the store with product listing and search/autocomplete.
 */
const HomePage = () => {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://v2.api.noroff.dev/online-shop')
        const data = await res.json()

        if (Array.isArray(data?.data)) {
          setProducts(data.data)
        } else {
          console.error('Unexpected API format:', data)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      const matched = products
        .filter((p) => p.title.toLowerCase().includes(lowerQuery))
        .slice(0, 5)

      setSuggestions(matched)
    } else {
      setSuggestions([])
    }
  }, [searchQuery, products])

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h1-wrapper">
      <div>
        <h1>OneStopShop</h1>
        <h3>All you need in one place</h3>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
