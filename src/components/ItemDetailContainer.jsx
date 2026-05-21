import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../firebase'
import ItemDetail from './ItemDetail'
import { IconAlert } from './icons'

export default function ItemDetailContainer() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProductById(id).then(d => {
      setItem(d)
    }).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="feedback">
        <div className="feedback-icon"><span className="spinner" /></div>
        <p className="feedback-title">Cargando producto</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="feedback">
        <div className="feedback-icon"><IconAlert /></div>
        <p className="feedback-title">Producto no encontrado</p>
        <p className="feedback-text">Puede que el enlace esté roto o el producto ya no esté disponible.</p>
      </div>
    )
  }

  return <ItemDetail item={item} />
}
