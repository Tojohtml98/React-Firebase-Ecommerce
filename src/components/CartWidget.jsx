import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { IconBag } from './icons'

export default function CartWidget() {
  const { totalQty } = useCart()
  const qty = totalQty()

  return (
    <Link to="/cart" className="cart-btn" aria-label={`Ver carrito · ${qty} ítems`}>
      <IconBag />
      <span>Carrito</span>
      <span className="cart-btn-qty mono-num">{qty}</span>
    </Link>
  )
}
