import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'
import { IconCheck, IconArrowLeft } from './icons'

const CATEGORY_LABEL = {
  mates: 'Mates',
  bombillas: 'Bombillas',
  yerbas: 'Yerbas',
  termos: 'Termos',
  accesorios: 'Accesorios',
  sets: 'Sets'
}

export default function ItemDetail({ item }) {
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()
  const lowStock = item.stock <= 5

  function handleAdd(qty) {
    addToCart(item, qty)
    setAdded(true)
  }

  return (
    <div className="fade-up">
      <Link to="/" className="detail-back">
        <IconArrowLeft /> Volver al catálogo
      </Link>

      <article className="detail">
        <div className="detail-media">
          <img src={item.image} alt={item.title} />
        </div>

        <div>
          <span className="detail-eyebrow">{CATEGORY_LABEL[item.category] || item.category}</span>
          <h1 className="detail-title">{item.title}</h1>

          <div className="detail-price">
            <span className="amount mono-num">${item.price.toLocaleString('es-AR')}</span>
            <span className={`stock ${lowStock ? 'low' : ''}`}>
              {item.stock > 0 ? `${item.stock} en stock` : 'Sin stock'}
            </span>
          </div>

          <p className="detail-desc">{item.description}</p>

          {!added ? (
            <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
          ) : (
            <div className="detail-added">
              <p><IconCheck /> Producto agregado al carrito</p>
              <div className="row">
                <Link to="/cart"><button className="btn primary">Ir al carrito</button></Link>
                <Link to="/"><button className="btn secondary">Seguir mirando</button></Link>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
