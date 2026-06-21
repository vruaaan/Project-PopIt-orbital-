import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { saveLocalSnapshot } from './localCache'

const SYNC_INTERVAL_MS = 60000 // batch writes every 60s of activity by default

const pendingByEmail = new Map()
const timerByEmail = new Map()

async function flush(email) {
  const pending = pendingByEmail.get(email)
  const timer = timerByEmail.get(email)
  if (timer) { // if timer present 
    clearTimeout(timer) // clear timer
  }
  timerByEmail.delete(email)
  if (!pending || Object.keys(pending).length === 0) { // no pending items 
    return
  }
  pendingByEmail.delete(email) // clear items
  try {
    const userRef = doc(db, 'users', email) // finds user document by email
    await setDoc(userRef, { ...pending, updated_at: serverTimestamp() }, { merge: true }) // writes to database with the updated file
  } catch (error) {
    console.error('Sync failed, re-queuing:', error)
    queueSync(email, pending) // put it back, retry on next cycle
  }
}


export function queueSync(email, fields) { // Every game action calls this. Cheap — no network — until the timer fires.
  if (!email) { // no email
    return
  }
  saveLocalSnapshot(email, fields) // update local cache immediately so a refresh never loses progress
  const existing = pendingByEmail.get(email) || {} // merge into the pending Firestore write 
  pendingByEmail.set(email, { ...existing, ...fields }) // updates the data inside the map 
  if (!timerByEmail.has(email)) { 
    const t = setTimeout(() => flush(email), SYNC_INTERVAL_MS)// set timer
    timerByEmail.set(email, t)
  }
}

export function flushNow(email) { // send data for that 1 email now 
  return flush(email)
}

export function flushAll() { // send all to db
  return Promise.all([...pendingByEmail.keys()].map(flush))
}