import React, { useEffect, useState } from 'react'
import { getProducts } from '../firebase'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom'

export default function ItemListContainer(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(()=>{
    setLoading(true)
    getProducts().then(data=>{
      if (categoryId){
        setItems(data.filter(p => p.category === categoryId))
      } else {
        setItems(data)
      }
    }).catch(console.error).finally(()=>setLoading(false))
  },[categoryId])

  if (loading) return <p>Loading productos...</p>
  if (!items.length) return <p>No hay productos en esta categoría</p>

  return <ItemList items={items} />
}
