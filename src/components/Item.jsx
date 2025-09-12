import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({ item }) {
  return (
    <div className="item-card">
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
