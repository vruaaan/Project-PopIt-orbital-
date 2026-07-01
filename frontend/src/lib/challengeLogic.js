import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export function getChallengeScoreValue(score) {
	return Number(score ?? 0)
}

export async function updateChallengeScore(email, score) {
	try {
		const userRef = doc(db, 'users', email)
		const payload = {
			score: getChallengeScoreValue(score),
			updated_at: serverTimestamp(),
		}

		await setDoc(userRef, payload, { merge: true })
		return { error: null }
	} catch (error) {
		return { error }
	}
}
