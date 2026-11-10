import React, { createContext, useContext, useEffect, useState } from 'react'
const CartContext = createContext()
export const useCart = () => useContext(CartContext)

// El carrito sobrevive a recargas y a volver otro día. try/catch: en modo privado
// o con storage bloqueado, localStorage puede tirar error → seguimos en memoria.
const STORAGE_KEY = 'matestore:cart'

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter(p => p && p.id && p.qty > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({children}){
  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)) } catch { /* sin storage: solo memoria */ }
  }, [cart])

  function addToCart(product, qty){
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing){
        return prev.map(p => p.id === product.id ? {...p, qty: Math.min(p.qty + qty, product.stock)} : p)
      }
      return [...prev, {...product, qty}]
    })
  }

  function removeFromCart(id){
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function clearCart(){ setCart([]) }

  function totalQty(){ return cart.reduce((s,c) => s + c.qty, 0) }

  function totalPrice(){ return cart.reduce((s,c) => s + c.qty * c.price, 0) }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, totalQty, totalPrice}}>
      {children}
    </CartContext.Provider>
  )
}
