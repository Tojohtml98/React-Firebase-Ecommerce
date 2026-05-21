import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { IconCheck, IconArrowLeft, IconArrowRight, IconAlert } from './icons'

export default function Checkout() {
  const { cart, clearCart, totalPrice, totalQty } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!cart.length) {
      setErrorMsg('Tu carrito está vacío')
      return
    }
    setLoading(true)
    setErrorMsg('')
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
    } catch (err) {
      console.error(err)
      setErrorMsg('No pudimos procesar el pedido. Probá de nuevo en un instante.')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="confirmation fade-up">
        <div className="confirmation-mark"><IconCheck /></div>
        <h2>Pedido confirmado</h2>
        <p>Gracias por confiar en MateStore. Te vamos a escribir por email con los próximos pasos.</p>
        <div className="order-code">#{String(orderId).slice(-10).toUpperCase()}</div>
        <div>
          <button className="btn primary" onClick={() => nav('/')}>
            Volver al catálogo <IconArrowRight />
          </button>
        </div>
      </div>
    )
  }

  if (!cart.length) {
    return (
      <div className="feedback fade-up">
        <div className="feedback-icon"><IconAlert /></div>
        <p className="feedback-title">No hay productos para comprar</p>
        <p className="feedback-text">Agregá productos al carrito antes de hacer el checkout.</p>
        <Link to="/" style={{ marginTop: 12 }}><button className="btn secondary">Ir al catálogo</button></Link>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <Link to="/cart" className="detail-back">
        <IconArrowLeft /> Volver al carrito
      </Link>

      <div style={{ marginBottom: 28 }}>
        <span className="eyebrow">Último paso</span>
        <h1 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', marginTop: 10 }}>
          Confirmá tus datos
        </h1>
      </div>

      <div className="checkout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Datos de contacto</h3>

          <div className="field">
            <label htmlFor="name">Nombre y apellido</label>
            <input
              id="name"
              type="text"
              placeholder="Como figure en la entrega"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              placeholder="+54 11 1234-5678"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
              autoComplete="tel"
            />
          </div>

          {errorMsg && (
            <div style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '10px 12px', borderRadius: 10,
              background: 'var(--danger-soft)', color: 'var(--danger)',
              border: '1px solid oklch(0.55 0.16 25 / 0.4)',
              fontSize: '0.88rem', marginBottom: 16
            }}>
              <IconAlert style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button type="submit" className="btn primary lg full" disabled={loading}>
            {loading ? 'Enviando…' : 'Confirmar pedido'}
            {!loading && <IconArrowRight />}
          </button>
        </form>

        <aside className="checkout-recap">
          <h3>Tu pedido · {totalQty()} ítems</h3>
          <ul>
            {cart.map(i => (
              <li key={i.id}>
                <span>{i.title}<small style={{ color: 'var(--fg-dim)', marginLeft: 6 }}>×{i.qty}</small></span>
                <span className="mono-num">${(i.qty * i.price).toLocaleString('es-AR')}</span>
              </li>
            ))}
          </ul>
          <div className="total">
            <span>Total</span>
            <span>${totalPrice().toLocaleString('es-AR')}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
