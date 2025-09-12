import React, { useEffect, useState } from 'react'
import { getProducts } from '../firebase'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom'

export default function ItemListContainer(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { categoryId } = useParams()

  useEffect(()=>{
    setLoading(true)
    setError(null)
    getProducts().then(data=>{
      console.log('Products loaded:', data) // Debug log
      if (categoryId){
        setItems(data.filter(p => p.category === categoryId))
      } else {
        setItems(data)
      }
    }).catch(err => {
      console.error('Error loading products:', err)
      setError(err.message)
    }).finally(()=>setLoading(false))
  },[categoryId])

  if (loading) return <div className="loading">Cargando productos...</div>
  if (error) return <div className="loading">Error: {error}</div>
  if (!items.length) return <div className="loading">No hay productos en esta categoría</div>

  return <ItemList items={items} />
}
