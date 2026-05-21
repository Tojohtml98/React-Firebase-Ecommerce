import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CartWidget from './components/CartWidget'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand" aria-label="MateStore inicio">
            <span className="brand-mark">Mate</span>
            <span className="brand-dot" />
            <span className="brand-mark">Store</span>
          </Link>
          <CartWidget />
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'var(--fg-dim)',
        fontSize: '0.82rem'
      }}>
        MateStore · Demo front-end · Catálogo, carrito y checkout en React · {new Date().getFullYear()}
      </footer>
    </>
  )
}
