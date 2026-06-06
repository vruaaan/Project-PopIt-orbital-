import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
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