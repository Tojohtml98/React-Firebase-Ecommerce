import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart(){
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()

  if (!cart.length) return (
    <div className="card">
      <h3>Carrito vacío</h3>
      <p>Agregá productos desde el catálogo.</p>
      <Link to="/">
        <button className="primary">Ir al catálogo</button>
      </Link>
    </div>
  )

  return (
    <div>
      <h2>Carrito</h2>
      <div>
        {cart.map(item=>(
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.title}</h4>
              <div className="quantity">Cantidad: {item.qty}</div>
            </div>
            <div className="item-price">${item.qty * item.price}</div>
            <button className="secondary" onClick={()=>removeFromCart(item.id)}>
              Quitar
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <h3>Total: ${totalPrice()}</h3>
        <div style={{display:'flex',gap:16,justifyContent:'center'}}>
          <button className="secondary" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/checkout">
            <button className="primary">Finalizar compra</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
