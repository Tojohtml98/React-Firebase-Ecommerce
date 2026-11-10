/*
  firebase.js — Firestore when configured; otherwise catalog mock from mock_products.js
*/
import { products as mockProducts } from './mock_products'
// Firebase se importa bajo demanda: sin config, el SDK (~80 KiB) ni se descarga.

const hasFirebaseConfig = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
const forceMock = import.meta.env.VITE_USE_MOCK === 'true';
const useMock = forceMock || !hasFirebaseConfig;
const FIRESTORE_TIMEOUT_MS = Number(import.meta.env.VITE_FIREBASE_TIMEOUT_MS || 7000);

// Firebase setup
let db = null;
let fs = null; // módulo firebase/firestore cargado dinámicamente
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
    const [{ initializeApp }, firestore] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
    ]);
    fs = firestore;
    db = fs.getFirestore(initializeApp(firebaseConfig));
    firebaseInitialized = true;
  } catch (error) {
    console.warn('Firebase initialization failed, using mock data:', error);
  }
}

function withTimeout(promise, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out`)), FIRESTORE_TIMEOUT_MS);
    }),
  ]);
}

export async function getProducts() {
  if (useMock) {
    await new Promise(r => setTimeout(r, 300))
    return mockProducts
  }
  
  await initFirebase();
  if (!db) {
    await new Promise(r => setTimeout(r, 300))
    return mockProducts
  }
  
  try {
    const snap = await withTimeout(fs.getDocs(fs.collection(db, 'products')), 'getProducts');
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('Firestore unavailable, using mock products:', error.message);
    return mockProducts;
  }
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
  
  try {
    const d = await withTimeout(fs.getDoc(fs.doc(db, 'products', id)), 'getProductById');
    if (!d.exists()) return null;
    return { id: d.id, ...d.data() };
  } catch (error) {
    console.warn('Firestore unavailable, using mock product detail:', error.message);
    return mockProducts.find(p => p.id === id) || null;
  }
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
  
  try {
    const docRef = await withTimeout(
      fs.addDoc(fs.collection(db, 'orders'), {
        ...order,
        date: new Date(),
      }),
      'createOrder'
    );
    return { id: docRef.id };
  } catch (error) {
    console.warn('Firestore unavailable, generating local order id:', error.message);
    return { id: 'order_' + Date.now() };
  }
}
