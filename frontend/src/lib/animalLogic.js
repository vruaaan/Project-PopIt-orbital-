import seal from '../assets/seal.png'
import cow from '../assets/cow.png'
import dol from '../assets/dolphin.png'

export const ANIMALS = [
  {
    id: 1,
    name: "Hit the sealion!",
    desc: "Not fake, not slim, not shady",
    img: seal,
    imgClass: "w-24 h-24",
    dbKey: "seal",
    chance: { base: 5, perLevel: 2, baseCost: 200, costScale: 1.8 },
    multiplier: { base: 2, perLevel: 1, baseCost: 300, costScale: 2.0 },
  },
  {
    id: 2,
    name: "Got milk?",
    desc: "Aerodynamically accurate",
    img: cow,
    imgClass: "w-24 h-24",
    dbKey: "cow",
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  },
  {
    id: 3,
    name: "What is this???",
    desc: "Have we gone too far",
    img: dol,
    imgClass: "w-24 h-24",
    dbKey: "dol",
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  }
]

export function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level))
}

export function calcStat(base, perLevel, level) {
  return +(base + perLevel * level).toFixed(1)
}

export function calcAnimalBonus(animalLevels) {
  let bonusMultiplier = 1
  const procdAnimals = []

  ANIMALS.forEach((animal) => {
    const state = animalLevels[animal.id]
    if (!state?.owned) return

    const chance = Math.floor(5.6 * Math.log2(state.chanceLvl + 1) + 5)
    const mult = animal.multiplier.base + animal.multiplier.perLevel * state.multLvl
    if (Math.random() * 100 < chance) {
      bonusMultiplier *= mult
      procdAnimals.push(animal.img)
    }
  })

  return { multiplier: bonusMultiplier, procdAnimals }
}
