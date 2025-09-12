# ProyectoFinal_Orella

Pequeña SPA de e-commerce (front-end) construida con **React + Vite**. Incluye:
- Listado y detalle de productos (ItemList, ItemDetail).
- Componente ItemCount para seleccionar cantidad y validaciones básicas.
- Carrito gestionado con Context.
- Integración con Firestore (si configuras variables VITE_FIREBASE_* en un .env).
- Generación de ordenes en Firestore (colección `orders`) o mock si no configuras Firebase.

## Estructura
- `src/components` - componentes UI
- `src/context` - CartContext
- `src/firebase.js` - adaptador a Firestore o mock
- `src/mock_products.js` - datos de ejemplo

## Pasos para usar (local)
1. Clona el repo o descomprime la carpeta.
2. Crear archivo `.env` en la raíz con tus credenciales de Firebase (opcional). Nombres de variables:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
Si no pones estas variables el proyecto usará datos mock locales.

3. Instala dependencias:
```bash
npm install
```

4. Ejecuta en modo desarrollo:
```bash
npm run dev
```
Abre el URL que te muestre Vite (normalmente http://localhost:5173).

## Cómo entregar
- Sube tu repo público a GitHub con nombre `ProyectoFinal+Apellido` (ej: `ProyectoFinal+Orella`).
- Envía enlace al repositorio (y si usaste variables de entorno, envíalas a tu profesor junto con la entrega).
- Puedes desplegar en Vercel/Netlify (ambos soportan Vite). En producción recuerda configurar las variables VITE_FIREBASE_* si quieres usar Firestore.

## Notas técnicas y criterios de la consigna
- SPA: navegación por React Router (sin recargas).
- Estado del carrito: Context.
- Firestore: `firebase.js` crea orders y lee colección `products` si configuras las variables.
- UX: se usan mensajes condicionales para loader, producto sin stock y carrito vacío.
- Buenas prácticas: separé contenedores (ItemListContainer, ItemDetailContainer) y componentes de presentación (ItemList, Item, ItemDetail).

## Qué falta / mejoras sugeridas (para completar antes de entregar)
- Validaciones de formulario más fuertes (email, teléfono).
- Mejor diseño / CSS (puedes usar Bootstrap o Material UI).
- Gestión de stock en Firestore al confirmar compra (hacer decremento de stock en transacción).
- PWA/Autenticación si el profesor lo pide.
- Tests unitarios.

## Archivo .env.example
Incluido en el repo como `.env.example`.

