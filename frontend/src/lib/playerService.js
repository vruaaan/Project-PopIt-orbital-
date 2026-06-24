import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

/** 
Creates a document in the 'users' collection, identified by the user's email, alled immediately after Firebase Auth signup.
 @param {string} email // - The user's email (used as the document ID)
 @param {string} username // - The display name chosen during signup
 @param {string} userId // - The Firebase Auth UID (stored as a field for cross-reference)
*/

// create account
export async function createProfile(email, username, userId) {
  try {
    const userRef = doc(db, 'users', email)
    const payload = {
      uid: userId, 
      email, 
      username,
      curr_count: 0, // curr chip count
      cum_count:0, // cumulative chip count
      purchase_count:0, // number of purchases made
      click_upgrades:{},
      special_upgrades:{},
      cosmetic_upgrades:{ original: true },
      created_at: serverTimestamp(), // created at
      updated_at: serverTimestamp(), // last updated
    }
    await setDoc(userRef, payload, { merge: true }) // merge: true means re-signup won't wipe existing data
    const snapshot = await getDoc(userRef)
    return { data: snapshot.exists() ? snapshot.data() : null, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

 // reads a single user's document from Firestore by their email, called on app load after session restore/login
export async function loadProfile(email) {
  try {
    const userRef = doc(db, 'users', email) // reads a single user's document from Firestore by their email
    const snapshot = await getDoc(userRef)
    if (!snapshot.exists()) {
      return { data: null, error: null }
    }
    return { data: snapshot.data(), error: null }
  } catch (error) {
    return { data: null, error }
  }
}
