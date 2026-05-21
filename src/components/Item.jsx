import React from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight } from './icons'

const CATEGORY_LABEL = {
  mates: 'Mates',
  bombillas: 'Bombillas',
  yerbas: 'Yerbas',
  termos: 'Termos',
  accesorios: 'Accesorios',
  sets: 'Sets'
}

export default function Item({ item }) {
  const lowStock = item.stock <= 5
  return (
    <Link to={`/item/${item.id}`} className="item-card fade-up" aria-label={item.title}>
      <div className="item-card-image">
        {lowStock && (
          <span className={`item-card-stock low`}>
            Últimas {item.stock}
          </span>
        )}
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="item-card-body">
        <span className="item-card-category">{CATEGORY_LABEL[item.category] || item.category}</span>
        <h3 className="item-card-title">{item.title}</h3>
        <div className="item-card-foot">
          <span className="item-card-price mono-num">${item.price.toLocaleString('es-AR')}</span>
          <span className="item-card-cta">
            Ver detalle <IconArrowRight />
          </span>
        </div>
      </div>
    </Link>
  )
}
