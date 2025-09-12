import React, { useState } from 'react'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'

export default function ItemDetail({item}){
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  function handleAdd(qty){
    addToCart(item, qty)
    setAdded(true)
  }

  return (
    <div className="card">
      <h2>{item.title}</h2>
      <p><small>{item.description}</small></p>
      <p>Precio: <strong>${item.price}</strong></p>
      <p>Stock: {item.stock}</p>
      {!added ? <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} /> : (
        <>
          <p>Producto agregado al carrito ✅</p>
          <a href="/cart"><button>Ir al carrito</button></a>
        </>
      )}
    </div>
  )
}
