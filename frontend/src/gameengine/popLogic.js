import { createChipParticles, createAnimalParticle } from './physics'
import { calcAnimalBonus } from '../lib/animalLogic'

export function getPopResult(clickPower, animalLevels) {
  const { multiplier, procdAnimals } = calcAnimalBonus(animalLevels)
  const earned = Math.floor(clickPower * multiplier)
  return { earned, animalImages: procdAnimals }
}

export function createPopParticles(originX, originY, chipImgs, animalImages = []) {
  const randomChip = chipImgs[Math.floor(Math.random() * chipImgs.length)]
  const chipParticles = createChipParticles(originX, originY, 1, randomChip)
  const animalParticles = animalImages.map((img) => createAnimalParticle(originX, originY, img))
  return [...chipParticles, ...animalParticles]
}
