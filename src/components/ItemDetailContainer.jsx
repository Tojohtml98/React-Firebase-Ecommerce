import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../firebase'
import ItemDetail from './ItemDetail'

export default function ItemDetailContainer(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    getProductById(id).then(d=>{
      setItem(d)
    }).catch(console.error).finally(()=>setLoading(false))
  },[id])

  if (loading) return <p className="loading">Cargando producto…</p>
  if (!item) return <p>Producto no encontrado</p>

  return <ItemDetail item={item} />
}
