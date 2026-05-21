import React, { useState } from 'react'

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial)

  const inc = () => setQty(q => Math.min(stock, q + 1))
  const dec = () => setQty(q => Math.max(1, q - 1))

  return (
    <div className="add-row">
      <div className="qty" aria-label="Cantidad">
        <button onClick={dec} disabled={qty <= 1} aria-label="Restar">−</button>
        <span className="qty-value mono-num">{qty}</span>
        <button onClick={inc} disabled={qty >= stock} aria-label="Sumar">+</button>
      </div>
      <button
        className="btn primary lg"
        onClick={() => onAdd(qty)}
        disabled={stock <= 0}
      >
        Agregar al carrito
      </button>
    </div>
  )
}
