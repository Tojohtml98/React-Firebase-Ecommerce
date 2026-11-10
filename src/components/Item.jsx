import React from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight } from './icons'
import { responsiveSrcSet } from '../utils/image'

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
    <Link to={`/item/${item.id}`} className="item-card fade-up">
      <div className="item-card-image">
        {lowStock && (
          <span className={`item-card-stock low`}>
            Últimas {item.stock}
          </span>
        )}
        <img
          src={item.image}
          srcSet={responsiveSrcSet(item.image)}
          sizes="(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 360px"
          alt={item.title}
          loading="lazy"
          decoding="async"
          width="900"
          height="900"
        />
      </div>
      <div className="item-card-body">
        <span className="item-card-category">{CATEGORY_LABEL[item.category] || item.category}</span>
        <h2 className="item-card-title">{item.title}</h2>
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
