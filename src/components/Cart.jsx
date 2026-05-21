import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { IconInbox, IconArrowRight } from './icons'

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice, totalQty } = useCart()

  if (!cart.length) {
    return (
      <div className="fade-up" style={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <div className="feedback-icon" style={{ margin: '0 auto 20px' }}><IconInbox /></div>
          <h2 className="display" style={{ fontSize: '2rem', marginBottom: 10 }}>Tu carrito está vacío</h2>
          <p style={{ color: 'var(--fg-muted)', marginBottom: 24 }}>
            Pasá por el catálogo y armá tu próxima mateada con calma.
          </p>
          <Link to="/"><button className="btn primary lg">Ver el catálogo <IconArrowRight /></button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart fade-up">
      <div className="cart-header">
        <span className="eyebrow">Tu pedido</span>
        <h1>Carrito</h1>
      </div>

      <div className="cart-list">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-thumb">
              {item.image && <img src={item.image} alt={item.title} loading="lazy" />}
            </div>
            <div className="cart-item-body">
              <h4>{item.title}</h4>
              <div className="meta">
                <span className="mono-num">${item.price.toLocaleString('es-AR')} c/u</span>
                <span style={{ color: 'var(--fg-dim)' }}>·</span>
                <span>Cantidad {item.qty}</span>
              </div>
            </div>
            <div className="cart-item-aside">
              <span className="price mono-num">${(item.qty * item.price).toLocaleString('es-AR')}</span>
              <button className="btn danger" onClick={() => removeFromCart(item.id)}>
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="cart-summary">
        <h3>Resumen</h3>
        <div className="row">
          <span>{totalQty()} ítems</span>
          <span className="mono-num">${totalPrice().toLocaleString('es-AR')}</span>
        </div>
        <div className="row">
          <span>Envío</span>
          <span style={{ color: 'var(--fg-dim)' }}>A calcular</span>
        </div>
        <div className="row divider total">
          <span>Total</span>
          <span className="amount">${totalPrice().toLocaleString('es-AR')}</span>
        </div>
        <div className="actions">
          <Link to="/checkout"><button className="btn primary full lg">Finalizar compra <IconArrowRight /></button></Link>
          <button className="btn ghost full" onClick={clearCart}>Vaciar carrito</button>
        </div>
      </aside>
    </div>
  )
}
