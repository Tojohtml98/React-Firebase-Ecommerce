import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({item}){
  return (
    <div className="card">
      <h4>{item.title}</h4>
      <p><small>{item.description}</small></p>
      <p><strong>${item.price}</strong></p>
      <Link to={'/item/' + item.id}><button>Ver detalle</button></Link>
    </div>
  )
}
