import React, { useState } from 'react'

export default function ItemCount({stock, initial=1, onAdd}){
  const [qty, setQty] = useState(initial)

  function inc(){ setQty(q => Math.min(stock, q+1)) }
  function dec(){ setQty(q => Math.max(1, q-1)) }

  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <button onClick={dec}>-</button>
      <span>{qty}</span>
      <button onClick={inc}>+</button>
      <button onClick={()=>onAdd(qty)} disabled={stock<=0}>Agregar</button>
    </div>
  )
}
