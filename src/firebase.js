/*
  firebase.js
  - Reads VITE_FIREBASE_* env vars (Vite uses VITE_ prefix from .env)
  - If env vars are missing, falls back to mock functions that use src/mock_products.js
*/
import { products as mockProducts } from './mock_products'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

// Force mock mode for now to fix loading issue
const useMock = true; // !import.meta.env.VITE_FIREBASE_API_KEY;

// Firebase setup
let db = null;
let firebaseInitialized = false;

async function initFirebase() {
  if (firebaseInitialized || useMock) return;
  
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    }
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    firebaseInitialized = true;
  } catch (error) {
    console.warn('Firebase initialization failed, using mock data:', error);
  }
}

export async function getProducts() {
  if (useMock) {
    // simulate network delay
    await new Promise(r => setTimeout(r, 300))
    console.log('Using mock products:', mockProducts.length, 'items')
    return mockProducts
  }
  
  await initFirebase();
  if (!db) {
    await new Promise(r => setTimeout(r, 300))
    return mockProducts
  }
  
  const snap = await getDocs(collection(db, 'products'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getProductById(id) {
  if (useMock) {
    await new Promise(r => setTimeout(r, 200))
    return mockProducts.find(p => p.id === id) || null
  }
  
  await initFirebase();
  if (!db) {
    await new Promise(r => setTimeout(r, 200))
    return mockProducts.find(p => p.id === id) || null
  }
  
  const d = await getDoc(doc(db, 'products', id))
  if (!d.exists()) return null
  return { id: d.id, ...d.data() }
}

export async function createOrder(order) {
  if (useMock) {
    await new Promise(r => setTimeout(r, 200))
    // return a fake order id
    return { id: 'order_' + Date.now() }
  }
  
  await initFirebase();
  if (!db) {
    return { id: 'order_' + Date.now() }
  }
  
  const docRef = await addDoc(collection(db, 'orders'), {
    ...order,
    date: new Date()
  })
  return { id: docRef.id }
}
