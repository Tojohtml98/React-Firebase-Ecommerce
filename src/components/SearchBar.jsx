import React from 'react'
import { IconSearch, IconX } from './icons'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar" role="search">
      <IconSearch className="search-bar-icon" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Escape') onChange('') }}
        placeholder="Buscar mates, yerbas, bombillas…"
        aria-label="Buscar productos"
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button type="button" className="search-bar-clear" onClick={() => onChange('')} aria-label="Limpiar búsqueda">
          <IconX />
        </button>
      )}
    </div>
  )
}
