import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/online-shop')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data)
        if (data && Array.isArray(data.data)) {
          setProducts(data.data)
        } else {
          console.error('Unexpected API response format:', data)
          setProducts([])
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setProducts([])
        setLoading(false)
      })
  }, [])

  // Auto-complete 
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5)) 
    } else {
      setSuggestions([]) 
    }
  }, [searchQuery, products])

  // Filtered products 
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <h2>Loading products...</h2>

  return (
    <div className="h1-wrapper">
    <div>
      <h1>OneStopShop</h1>
      <h3>All you need in one place</h3>
      </div>

      {/*  Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="search products"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Auto-Complete Dropdown */}
      {suggestions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Display Filtered Products */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  )
}

export default HomePage
