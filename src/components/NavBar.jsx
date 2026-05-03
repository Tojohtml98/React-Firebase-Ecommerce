import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar(){
  return (
    <nav style={{display:'flex',alignItems:'center',gap:12}} className="nav-links">
      <Link to="/">Catálogo</Link>
      <Link to="/category/mates">Mates</Link>
      <Link to="/category/bombillas">Bombillas</Link>
      <Link to="/category/yerbas">Yerbas</Link>
      <Link to="/category/termos">Termos</Link>
      <Link to="/category/sets">Sets</Link>
      <Link to="/cart">Carrito</Link>
      <CartWidget />
    </nav>
  )
}
