import React from 'react'
import { NavLink, useParams, useLocation } from 'react-router-dom'

const CATEGORIES = [
  { slug: '',           label: 'Todo' },
  { slug: 'mates',      label: 'Mates' },
  { slug: 'bombillas',  label: 'Bombillas' },
  { slug: 'yerbas',     label: 'Yerbas' },
  { slug: 'termos',     label: 'Termos' },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'sets',       label: 'Sets' }
]

export default function NavBar() {
  const { categoryId } = useParams()
  const active = categoryId || ''
  const { search } = useLocation() // conserva ?q= al cambiar de categoría

  return (
    <nav className="category-index" aria-label="Categorías">
      {CATEGORIES.map(c => (
        <NavLink
          key={c.slug || 'all'}
          to={{ pathname: c.slug ? `/category/${c.slug}` : '/', search }}
          className={active === c.slug ? 'active' : ''}
        >
          {c.label}
        </NavLink>
      ))}
    </nav>
  )
}
