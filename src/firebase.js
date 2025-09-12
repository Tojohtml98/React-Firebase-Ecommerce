/*
  firebase.js
  - Reads VITE_FIREBASE_* env vars (Vite uses VITE_ prefix from .env)
  - If env vars are missing, falls back to mock functions that use src/mock_products.js
*/
import { products as mockProducts } from './mock_products'

const useMock = !import.meta.env.VITE_FIREBASE_API_KEY;

if (!useMock) {
  import { initializeApp } from 'firebase/app'
  import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore'
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  export async function getProducts() {
    const snap = await getDocs(collection(db, 'products'))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  export async function getProductById(id) {
    const d = await getDoc(doc(db, 'products', id))
    if (!d.exists()) return null
    return { id: d.id, ...d.data() }
  }

  export async function createOrder(order) {
    const ref = await addDoc(collection(db, 'orders'), order)
    return ref.id
  }
} else {
  // Mock implementations
  export async function getProducts() {
    // simulate network
    await new Promise(r => setTimeout(r, 300))
    return mockProducts
  }
  export async function getProductById(id) {
    await new Promise(r => setTimeout(r, 200))
    return mockProducts.find(p => p.id === id) || null
  }
  export async function createOrder(order) {
    await new Promise(r => setTimeout(r, 200))
    // return a fake order id
    return 'MOCK-' + Math.random().toString(36).slice(2,9).toUpperCase()
  }
}
