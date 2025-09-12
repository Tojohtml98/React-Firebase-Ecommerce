// Script para subir productos a Firestore
// Ejecutar con: node upload-products.js

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { products } from './src/mock_products.js'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function uploadProducts() {
  console.log('Subiendo productos a Firestore...')
  
  for (const product of products) {
    try {
      // Remover el id del objeto ya que Firestore genera uno automáticamente
      const { id, ...productData } = product
      const docRef = await addDoc(collection(db, 'products'), productData)
      console.log(`✅ Producto "${product.title}" subido con ID: ${docRef.id}`)
    } catch (error) {
      console.error(`❌ Error subiendo "${product.title}":`, error)
    }
  }
  
  console.log('🎉 ¡Productos subidos exitosamente!')
  process.exit(0)
}

uploadProducts().catch(console.error)
