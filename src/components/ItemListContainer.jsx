import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProducts } from '../firebase'
import ItemList from './ItemList'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import { filterProducts } from '../utils/search'
import { IconInbox, IconAlert, IconSearch } from './icons'

const CATEGORY_COPY = {
  '': {
    eyebrow: 'Catálogo',
    title: <>La cultura del mate, <em>curada con detalle.</em></>,
    sub: 'Selección de yerbas, mates artesanales, bombillas, termos y accesorios. Piezas de productores nacionales, presentadas con la calma que merecen.'
  },
  mates: {
    eyebrow: 'Mates',
    title: <>Compañeros de <em>cada ronda.</em></>,
    sub: 'Calabaza, algarrobo, cuero o porcelana. Piezas para cebar todos los días y otras para guardar y heredar.'
  },
  bombillas: {
    eyebrow: 'Bombillas',
    title: <>El paso justo entre <em>vos y la yerba.</em></>,
    sub: 'Alpaca, acero quirúrgico y plata 925. Filtros que respetan la molienda y picos que cuidan la lengua.'
  },
  yerbas: {
    eyebrow: 'Yerbas',
    title: <>Cosechas, blends, <em>secretos del monte.</em></>,
    sub: 'Misiones, Corrientes, NOA. Hoja, palo y carácter. Una para cada estilo y para cada hora del día.'
  },
  termos: {
    eyebrow: 'Termos',
    title: <>Agua caliente, <em>durante horas.</em></>,
    sub: 'Acero, doble pared, picos vertedores y manijas pensadas para el camino. Lo que necesitás para que la mateada no se corte.'
  },
  accesorios: {
    eyebrow: 'Accesorios',
    title: <>Lo que rodea <em>al ritual.</em></>,
    sub: 'Yerberas, azucareras, bandejas, kits de limpieza. Cosas pequeñas que mejoran cada momento.'
  },
  sets: {
    eyebrow: 'Sets',
    title: <>Empezar, regalar, <em>viajar liviano.</em></>,
    sub: 'Combos pensados con criterio. Desde la iniciación hasta lo más completo. Ideales para arrancar o sorprender.'
  }
}

export default function ItemListContainer() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const slug = categoryId || ''
  const copy = CATEGORY_COPY[slug] || CATEGORY_COPY['']

  useEffect(() => {
    setLoading(true)
    setError(null)
    getProducts()
      .then(data => {
        setItems(categoryId ? data.filter(p => p.category === categoryId) : data)
      })
      .catch(err => {
        console.error('Error loading products:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [categoryId])

  const visible = useMemo(() => filterProducts(items, query), [items, query])

  // replace: true → tipear no llena el historial con una entrada por letra
  const handleSearch = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  return (
    <>
      <section className="hero fade-up">
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1 className="hero-title" style={{ marginTop: 12 }}>{copy.title}</h1>
          <p className="hero-sub">{copy.sub}</p>
        </div>
        <div className="hero-meta">
          <span><strong>Hecho en Argentina</strong> · Productores y artesanos nacionales</span>
          <span>{loading ? 'Cargando inventario' : query ? `${visible.length} de ${items.length} piezas` : `${items.length} piezas en exhibición`}</span>
          <span>Envíos a toda Argentina · Atención por WhatsApp</span>
        </div>
      </section>

      <div className="catalog-toolbar">
        <NavBar />
        <SearchBar value={query} onChange={handleSearch} />
      </div>

      {loading ? (
        <div className="feedback">
          <div className="feedback-icon"><span className="spinner" /></div>
          <p className="feedback-title">Cargando productos</p>
          <p className="feedback-text">Estamos trayendo el inventario, un instante.</p>
        </div>
      ) : error ? (
        <div className="feedback">
          <div className="feedback-icon"><IconAlert /></div>
          <p className="feedback-title">No pudimos cargar el catálogo</p>
          <p className="feedback-text">{error}</p>
        </div>
      ) : !items.length ? (
        <div className="feedback">
          <div className="feedback-icon"><IconInbox /></div>
          <p className="feedback-title">Esta categoría está vacía</p>
          <p className="feedback-text">Probá con otra sección del catálogo.</p>
        </div>
      ) : !visible.length ? (
        <div className="feedback">
          <div className="feedback-icon"><IconSearch /></div>
          <p className="feedback-title">Sin resultados para “{query.trim()}”</p>
          <p className="feedback-text">Probá con otra palabra o buscá en todo el catálogo.</p>
          <button type="button" className="btn secondary" onClick={() => handleSearch('')}>Limpiar búsqueda</button>
        </div>
      ) : (
        <ItemList items={visible} />
      )}
    </>
  )
}
