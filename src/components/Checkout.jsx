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
      const id = await createOrder(order)
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
      <h3>Compra realizada ✅</h3>
      <p>ID de orden: <strong>{orderId}</strong></p>
      <button onClick={()=>nav('/')}>Volver al inicio</button>
    </div>
  )

  return (
    <div className="card">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:8}}>
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
        <input placeholder="Teléfono" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/>
        <p>Total a pagar: ${totalPrice()}</p>
        <button type="submit" disabled={loading}>{loading ? 'Procesando...' : 'Confirmar compra'}</button>
      </form>
    </div>
  )
}
