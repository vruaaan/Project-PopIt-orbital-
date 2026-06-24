import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

//update chip count 
export async function updateChips(email, currCount, cumCount, purchaseCount) {
  try {
    const userRef = doc(db, 'users', email)
    const payload = {
      curr_count: currCount,
      cum_count: cumCount,
      updated_at: serverTimestamp(),
    }
    if (purchaseCount !== undefined) {
      payload.purchase_count = purchaseCount
    }
    await setDoc(userRef,
      payload,
      { merge: true }
    )
    return { error: null }  
  } catch (error) {
    return { error }
  }
}

//Persists Pop! tab upgrade levels to Firestore.
export async function updateClickUpgrades(email, clickUpgrades) {
  try {
    const userRef = doc(db, 'users', email)
    await setDoc(
      userRef,
      { click_upgrades: clickUpgrades, updated_at: serverTimestamp() },
      { merge: true }
    )
    return { error: null }
  } catch (error) {
    return { error }
  }
}

// update Specials tab upgrade levels
export async function updateSpecialUpgrades(email, specialUpgrades) {
  await setDoc(
    doc(db, 'users', email),
    { special_upgrades: specialUpgrades, updated_at: serverTimestamp() },
    { merge: true }
  )
}

// update cosmetic unlocks and equipped can
export async function updateCosmetics(email, cosmeticUpgrades) {
  await setDoc(
    doc(db, 'users', email),
    { cosmetic_upgrades: cosmeticUpgrades, updated_at: serverTimestamp() },
    { merge: true }
  )
}
