import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'


export async function updateClickLevels(email, clickLevels) {
  await updateDoc(doc(db, 'players', email), { click_levels: clickLevels })
}

export async function updateAnimalLevels(email, animalLevels) {
  await updateDoc(doc(db, 'players', email), { animal_levels: animalLevels })
}

export async function updateCosmeticOwned(email, cosmeticOwned) {
  await updateDoc(doc(db, 'players', email), { cosmetic_owned: cosmeticOwned })
}