import seal from '../assets2/seal.webp' 
import cow from '../assets2/cow.webp' 
import dol from '../assets2/dolphin.webp'
import { ANIMAL_BALANCE, calcAnimalChance } from './shopConstants'

export const ANIMALS = [
  {
    id: 1,
    name: "Hit the sealion!",
    desc: "Not fake, not slim, not shady",
    img: seal,
    imgClass: "w-24 h-24",
    dbKey: "seal",
    ...ANIMAL_BALANCE[1],
  },
  {
    id: 2,
    name: "Got milk?",
    desc: "Aerodynamically accurate",
    img: cow,
    imgClass: "w-24 h-24",
    dbKey: "cow",
    ...ANIMAL_BALANCE[2],
  },
  {
    id: 3,
    name: "What is this???",
    desc: "Have we gone too far",
    img: dol,
    imgClass: "w-24 h-24",
    dbKey: "dol",
    ...ANIMAL_BALANCE[3],
  }
]

export function calcAnimalBonus(animalLevels) {
  let bonusMultiplier = 1
  const procdAnimals = []

  ANIMALS.forEach((animal) => {
    const state = animalLevels[animal.id]
    if (!state?.owned) return

    const chance = calcAnimalChance(state.chanceLvl)
    const mult = animal.multiplier.base + animal.multiplier.perLevel * state.multLvl
    if (Math.random() * 100 < chance) {
      bonusMultiplier *= mult
      procdAnimals.push(animal.img)
    }
  })

  return { multiplier: bonusMultiplier, procdAnimals }
}
