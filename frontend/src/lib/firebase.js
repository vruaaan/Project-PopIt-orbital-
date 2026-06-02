import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

function requireEnv(key) {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Missing required Firebase env variable: ${key}`)
  }
  return value
}

const firebaseConfig = {
  apiKey: requireEnv('VITE_FIREBASE_API_KEY'),
  authDomain: requireEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: requireEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: requireEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requireEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: requireEnv('VITE_FIREBASE_APP_ID'),
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export function getCurrentSessionUser() {
  return auth.currentUser
}

export async function signInWithEmail(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
    return { user: credential.user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

export async function signUpWithEmail(username, email, password) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
    if (username?.trim()) {
      await updateProfile(credential.user, { displayName: username.trim() })
    }
    return { user: credential.user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

export async function signOutUser() {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error) {
    return { error }
  }
}