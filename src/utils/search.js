// Búsqueda client-side: insensible a mayúsculas y tildes ("yerba organica" encuentra "Yerba Orgánica").
export const normalize = (str = '') =>
  str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

// Cada palabra de la búsqueda tiene que aparecer en título, descripción o categoría (AND).
export function filterProducts(products, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (!terms.length) return products

  return products.filter(p => {
    const haystack = normalize(`${p.title} ${p.description} ${p.category}`)
    return terms.every(t => haystack.includes(t))
  })
}
