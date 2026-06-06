import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'

export async function getLeaderboard(limitCount = 10) {
  try {
    const usersRef = collection(db, 'users')
    const q = query( //checking the number of users, ordering in descending order of cumulative count
      usersRef,
      orderBy('cum_count', 'desc'),
      limit(limitCount)
    )
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => doc.data())
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}