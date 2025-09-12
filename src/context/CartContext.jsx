import React, { createContext, useContext, useState } from 'react'
const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({children}){
  const [cart, setCart] = useState([])

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
