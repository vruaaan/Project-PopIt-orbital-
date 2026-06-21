const PREFIX = 'popit:' // identifier key in local storage to identify data that is stored by the game

export function saveLocalSnapshot(email, fields) { // Merges new fields into whatever's cached and writes the result back.
  if (!email) { // no email
    return
  }
  try { // have email, try
    const existing = loadLocalSnapshot(email) || {} // load existing local data, else empty 
    const merged = { ...existing, ...fields, savedAt: Date.now() } // merges existing (prev local data) with fields (new data) and retains new one 
    localStorage.setItem(PREFIX + email, JSON.stringify(merged)) // save it to local storage
  } catch (error) { // if error occurs
    console.error('Failed to save local snapshot:', error)
  }
}

export function loadLocalSnapshot(email) { // load existing local data
  if (!email) {
    return null
  }
  try {
        const raw = localStorage.getItem(PREFIX + email) // retrieve existing local data using PREFIX and email given 
        return raw ? JSON.parse(raw) : null // return the data
  } catch (error) {
    console.error('Failed to load local snapshot:', error)
    return null
  }
}

export function clearLocalSnapshot(email) {
  if (!email) {
    return
  }
  try {
    localStorage.removeItem(PREFIX + email) // delete the current local data
  } catch (error) {
    console.error('Failed to clear local snapshot:', error)
  }
}