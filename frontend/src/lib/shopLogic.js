import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'


export async function updateClickLevels(email, clickLevels) {
  await setDoc(doc(db, 'users', email), { click_levels: clickLevels, updated_at: serverTimestamp() }, { merge: true })
}

export async function updateAnimalLevels(email, animalLevels) {
  await setDoc(doc(db, 'users', email), { animal_levels: animalLevels, updated_at: serverTimestamp() }, { merge: true })
}

export async function updateCosmeticOwned(email, cosmeticOwned) {
  await setDoc(doc(db, 'users', email), { cosmetic_owned: cosmeticOwned, updated_at: serverTimestamp() }, { merge: true })
}
