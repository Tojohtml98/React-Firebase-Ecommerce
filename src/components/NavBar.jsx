import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar(){
  return (
    <nav style={{display:'flex',alignItems:'center',gap:12}} className="nav-links">
      <Link to="/">Catálogo</Link>
      <Link to="/category/deporte">Deporte</Link>
      <Link to="/category/indumentaria">Indumentaria</Link>
      <Link to="/category/calzado">Calzado</Link>
      <Link to="/cart">Carrito</Link>
      <CartWidget />
    </nav>
  )
}
