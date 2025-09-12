import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({ item }) {
  return (
    <div className="item-card">
      <div className="item-image">
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop'} 
          alt={item.title}
          loading="lazy"
        />
      </div>
      <div className="item-info">
        <h3>{item.title}</h3>
        <p className="item-price">${item.price.toLocaleString()}</p>
        <p className="item-stock">Stock: {item.stock}</p>
        <Link to={`/item/${item.id}`} className="btn btn-primary">
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}
