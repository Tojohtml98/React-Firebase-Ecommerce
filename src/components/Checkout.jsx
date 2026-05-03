import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const { cart, clearCart, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [form, setForm] = useState({name:'', email:'', phone:''})
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    if (!cart.length) return alert('Carrito vacío')
    setLoading(true)
    const order = {
      buyer: form,
      items: cart,
      total: totalPrice(),
      date: new Date().toISOString()
    }
    try {
      const { id } = await createOrder(order)
      setOrderId(id)
      clearCart()
    } catch(err){
      console.error(err)
      alert('Error al crear orden')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) return (
    <div className="card">
      <h3>Pedido confirmado</h3>
      <p>Gracias por tu compra. Este es tu número de pedido:</p>
      <p>Número de pedido: <strong>{orderId}</strong></p>
      <button className="primary" onClick={()=>nav('/')}>
        Volver al catálogo
      </button>
    </div>
  )

  return (
    <div className="checkout-form">
      <h3>Checkout</h3>
      <p>Total: <strong className="price">${totalPrice()}</strong></p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre y apellido</label>
          <input 
            type="text"
            placeholder="Como figure en la entrega"
            value={form.name} 
            onChange={e=>setForm({...form,name:e.target.value})} 
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            placeholder="tu@email.com" 
            value={form.email} 
            onChange={e=>setForm({...form,email:e.target.value})} 
            required
          />
        </div>
        
        <div className="form-group">
          <label>Teléfono</label>
          <input 
            type="tel"
            placeholder="+54 11 1234-5678" 
            value={form.phone} 
            onChange={e=>setForm({...form,phone:e.target.value})} 
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="primary" 
          disabled={loading}
          style={{width: '100%', marginTop: '16px'}}
        >
          {loading ? 'Enviando…' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  )
}
