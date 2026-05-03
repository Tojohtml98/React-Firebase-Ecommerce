import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartWidget(){
  const { totalQty } = useCart()
  return (
    <Link to="/cart" style={{display:'flex',alignItems:'center'}}>
      <img src="https://img.icons8.com/ios-filled/24/ffffff/shopping-cart.png" alt="Ver carrito" width={24} height={24}/>
      <span className="cart-badge">{totalQty()}</span>
    </Link>
  )
}
