import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from './CartIcon'

const Header = () => {
    return (
      <header>
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/contact">CONTACT</Link>
          <CartIcon/>
        </nav>
      </header>
    )
}

export default Header;
