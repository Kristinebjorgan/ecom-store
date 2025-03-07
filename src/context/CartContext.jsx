import React, { createContext, useState, useEffect } from 'react'

// Create Context
export const CartContext = createContext()

// Cart Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage (persistent cart)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(storedCart)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product])
  }

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Clear all items from the cart 
  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart') 
  }

  // Get total price of all items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.discountedPrice, 0)
  }

  // Get cart count
  const cartCount = cart.length

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotalPrice,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
