import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

function formatLeaderboard(doc, index) {
  const d = doc.data()
  return {
    rank: String(index + 1).padStart(2, '0'),
    user: d.username,
    cosmetics: d.purchase_count,
    Chips: d.cum_count,
  }
}


export async function getLeaderboardDefault(limitCount = 10) {
  try {
    const usersRef = collection(db, 'users')
    const q = query( //checking the number of users, ordering in descending order of cumulative count
      usersRef,
      orderBy('cum_count', 'desc'),
      limit(limitCount)
    )
    const snapshot = await getDocs(q)
    const realEntries = snapshot.docs.map(formatLeaderboard)
    const emptySlots = Array.from(
      { length: limitCount - realEntries.length },
      (_, index) => ({
        rank: String(realEntries.length + index + 1).padStart(2, '0'),
        user: '-',
        cosmetics: '-',
        Chips: '-',
      })
    )
    return { data: [...realEntries, ...emptySlots], error: null }
  } catch (error) { // to handle error
    return { data: null, error }
  }
}
