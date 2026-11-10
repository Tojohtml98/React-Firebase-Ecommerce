import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { IconBag } from './icons'

export default function CartWidget() {
  const { totalQty } = useCart()
  const qty = totalQty()

  return (
    <Link to="/cart" className="cart-btn">
      <IconBag />
      <span>Carrito</span>
      <span className="cart-btn-qty mono-num">{qty}</span>
      <span className="sr-only">{qty === 1 ? 'producto' : 'productos'}</span>
    </Link>
  )
}
