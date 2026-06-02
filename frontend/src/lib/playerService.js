import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function createProfile(userId, name) {
  try {
    const profileRef = doc(db, 'profiles', userId)
    const payload = {
      user_id: userId,
      username: name,
      chips: 0,
      click_power: 1,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    }

    await setDoc(profileRef, payload, { merge: true })

    const snapshot = await getDoc(profileRef)
    return { data: snapshot.exists() ? snapshot.data() : null, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function loadProfile(userId) {
  try {
    const profileRef = doc(db, 'profiles', userId)
    const snapshot = await getDoc(profileRef)
    if (!snapshot.exists()) {
      return { data: null, error: null }
    }

    return { data: snapshot.data(), error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function updateChips(userId, chips) {
  try {
    const profileRef = doc(db, 'profiles', userId)
    await setDoc(
      profileRef,
      {
        user_id: userId,
        chips,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )

    return { error: null }
  } catch (error) {
    return { error }
  }
}

export async function updateClickPower(userId, clickPower) {
  try {
    const profileRef = doc(db, 'profiles', userId)
    await setDoc(
      profileRef,
      {
        user_id: userId,
        click_power: clickPower,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )

    return { error: null }
  } catch (error) {
    return { error }
  }
}
