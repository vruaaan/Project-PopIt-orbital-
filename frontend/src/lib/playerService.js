import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

/** 
Creates a document in the 'users' collection, identified by the user's email, alled immediately after Firebase Auth signup.
 @param {string} email // - The user's email (used as the document ID)
 @param {string} username // - The display name chosen during signup
 @param {string} userId // - The Firebase Auth UID (stored as a field for cross-reference)
*/
export async function createProfile(email, username, userId) {
  try {
    const userRef = doc(db, 'users', email)
    const payload = {
      uid: userId,
      email, 
      username,
      curr_count: 0,
      cum_count:0,
      purchase_count:0,
      click_pow: 1,
      auto_popper: 0,
      default_cp: 0,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      seal_cp: 0,
      seal_prob: 0,
      cow_cp : 0,
      cow_prob: 0,
      dol_cp: 0,
      dol_prob : 0
    }
    // merge: true means re-signup won't wipe existing data
    await setDoc(userRef, payload, { merge: true })
    const snapshot = await getDoc(userRef)
    return { data: snapshot.exists() ? snapshot.data() : null, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Loads a user's profile by email.
export async function loadProfile(email) {
  try {
    const userRef = doc(db, 'users', email)
    const snapshot = await getDoc(userRef)
    if (!snapshot.exists()) {
      return { data: null, error: null }
    }
    return { data: snapshot.data(), error: null }
  } catch (error) {
    return { data: null, error }
  }
}

//Persists the current chip count to Firestore.
export async function updateChips(email, chips) {
  try {
    const userRef = doc(db, 'users', email)
    await setDoc(userRef, { chips, updated_at: serverTimestamp() }, { merge: true })
    return { error: null }
  } catch (error) {
    return { error }
  }
}

//Persists the current click power to Firestore.
export async function updateClickPower(email, clickPower) {
  try {
    const userRef = doc(db, 'users', email)
    await setDoc(
      userRef,
      { click_power: clickPower, updated_at: serverTimestamp() },
      { merge: true }
    )
    return { error: null }
  } catch (error) {
    return { error }
  }
}