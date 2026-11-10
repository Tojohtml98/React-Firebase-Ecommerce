// Las fotos vienen de Pexels/Unsplash con ?w=900&h=900. Pedimos tamaños menores
// para que el celular no baje 900 px cuando muestra la tarjeta a ~350 px.
const WIDTHS = [400, 500, 600, 700, 800, 900]

export function responsiveSrcSet(url = '') {
  if (!/[?&]w=900&h=900/.test(url)) return undefined
  return WIDTHS.map(w => `${url.replace('w=900&h=900', `w=${w}&h=${w}`)} ${w}w`).join(', ')
}
