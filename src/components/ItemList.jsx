import React from 'react'
import Item from './Item'

export default function ItemList({items}) {
  return (
    <div className="product-grid">
      {items.map(i => <Item key={i.id} item={i} />)}
    </div>
  )
}
