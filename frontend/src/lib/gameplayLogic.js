import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

//update chip coiunt 
export async function updateChips(email, currCount, cumCount) {
  try {
    const userRef = doc(db, 'users', email)
    await setDoc(userRef,
      {curr_count: currCount,
        cum_count: cumCount,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    )
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
      { click_pow: clickPower, updated_at: serverTimestamp() },
      { merge: true }
    )
    return { error: null }
  } catch (error) {
    return { error }
  }
}

// update auto_popper level
export async function updateAutoPopper(email, level) {
  await updateDoc(doc(db, 'users', email), { auto_popper: level })
}

// update seal upgrades
export async function updateSeal(email, chanceLvl, multLvl) {
  await updateDoc(doc(db, 'users', email), { seal_prob: chanceLvl, seal_cp: multLvl })
}

// update cow upgrades
export async function updateCow(email, chanceLvl, multLvl) {
  await updateDoc(doc(db, 'users', email), { cow_prob: chanceLvl, cow_cp: multLvl })
}

// update dolphin upgrades
export async function updateDol(email, chanceLvl, multLvl) {
  await updateDoc(doc(db, 'users', email), { dol_prob: chanceLvl, dol_cp: multLvl })
}