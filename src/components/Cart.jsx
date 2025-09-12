import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart(){
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()

  if (!cart.length) return <div className="card"><p>Carrito vacío</p><Link to="/"><button>Ir al catálogo</button></Link></div>

  return (
    <div>
      <h3>Carrito</h3>
      <div>
        {cart.map(item=>(
          <div key={item.id} className="card" style={{marginBottom:8}}>
            <h4>{item.title}</h4>
            <p>Cantidad: {item.qty} - Subtotal: ${item.qty * item.price}</p>
            <button onClick={()=>removeFromCart(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <h4>Total: ${totalPrice()}</h4>
      <div style={{display:'flex',gap:8}}>
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout"><button>Finalizar compra</button></Link>
      </div>
    </div>
  )
}
