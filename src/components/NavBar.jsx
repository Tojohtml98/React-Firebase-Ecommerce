import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

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

  return (
    <nav className="category-index" aria-label="Categorías">
      {CATEGORIES.map(c => (
        <NavLink
          key={c.slug || 'all'}
          to={c.slug ? `/category/${c.slug}` : '/'}
          className={active === c.slug ? 'active' : ''}
        >
          {c.label}
        </NavLink>
      ))}
    </nav>
  )
}
