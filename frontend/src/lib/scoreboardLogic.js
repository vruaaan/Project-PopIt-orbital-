import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

function formatScoreboard(doc, index) {
  const d = doc.data()

  return {
    rank: String(index + 1).padStart(2, '0'),
    user: d.username ?? '-',
    score: d.score ?? 0,
  }
}

export async function getScoreboard(limitCount = 10) {
  try {
    const usersRef = collection(db, 'users')
    const q = query(
      usersRef,
      orderBy('score', 'desc'),
      limit(limitCount)
    )
    const snapshot = await getDocs(q)
    const realEntries = snapshot.docs.map(formatScoreboard)

    const emptySlots = Array.from(
      { length: limitCount - realEntries.length },
      (_, index) => ({
        rank: String(realEntries.length + index + 1).padStart(2, '0'),
        user: '-',
        score: '-',
      })
    )

    return { data: [...realEntries, ...emptySlots], error: null }
  } catch (error) {
    return { data: null, error }
  }
}
