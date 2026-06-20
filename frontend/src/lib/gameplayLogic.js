import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import clicker from '../assets/clicker icon.png'
import saltnpepper from '../assets/saltnpepper.png'

export const CLICK_UPGRADES = [
  { id: 1, name: "Click...Click...Boom!", db_name: "auto_popper", img: clicker, imgClass:"w-25 h-25", desc: "Free your hand, click your can ", baseCost: 50,  costScale: 1.5, powerPerLevel: 1 },
  { id: 2, name: "Salt 'n Pepper Shaker", db_name: "click_pow", img: saltnpepper, imgClass:"w-30 h-30", desc: "Flavour your chips with each upgrade, increasing the value of each chip popped !", baseCost: 150, costScale: 1.8, powerPerLevel: 2 },
];

export function calcClickPower(clickLevels) {
  return 1 + CLICK_UPGRADES.reduce(
    (sum, item) => sum + (clickLevels[item.id] ?? 0) * item.powerPerLevel, 0
  )
}

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
  await setDoc(doc(db, 'users', email), { auto_popper: level, updated_at: serverTimestamp() }, { merge: true })
}

// update seal upgrades
export async function updateSeal(email, chanceLvl, multLvl, owned) {
  await setDoc(
    doc(db, 'users', email),
    { seal: { prob: chanceLvl, cp: multLvl, owned }, updated_at: serverTimestamp() },
    { merge: true }
  )
}

// update cow upgrades
export async function updateCow(email, chanceLvl, multLvl, owned) {
  await setDoc(
    doc(db, 'users', email),
    { cow: { prob: chanceLvl, cp: multLvl, owned }, updated_at: serverTimestamp() },
    { merge: true }
  )
}

// update dolphin upgrades
export async function updateDol(email, chanceLvl, multLvl, owned) {
  await setDoc(
    doc(db, 'users', email),
    { dol: { prob: chanceLvl, cp: multLvl, owned }, updated_at: serverTimestamp() },
    { merge: true }
  )
}

// update cosmetic unlocks and equipped can
export async function updateCosmetics(email, cosmeticOwned, equippedCosmetic) {
  await setDoc(
    doc(db, 'users', email),
    { cosmetic_owned: cosmeticOwned, equipped_cosmetic: equippedCosmetic, updated_at: serverTimestamp() },
    { merge: true }
  )
}
