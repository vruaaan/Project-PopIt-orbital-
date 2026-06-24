import seal from '../assets/seal.webp' 
import cow from '../assets/cow.webp' 
import dol from '../assets/dolphin.webp'
import egg from '../assets/egg.webp'
import phx from '../assets/phx.webp'
import ball from '../assets/ball.webp'
import { ANIMAL_BALANCE, calcAnimalChance } from './shopConstants'

export const ANIMALS = [
  {
    id: 1, 
    name: "Hit the sealion!", dbKey: "seal",
    desc: "Not fake, not slim, not shady",
    img: seal,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[1],
  },
  {
    id: 2,
    name: "Got milk?", dbKey: "cow",
    desc: "aerodynamically accurate",
    img: cow,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[2],
  },
  {
    id: 3,
    name: "What is this???", dbKey: "dol",
    desc: "have we gone too far...",
    img: dol,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[3],
  },
  {
    id: 4,
    name: "lawrence", dbKey: "egg",
    desc: "#eatan by the egg",
    img: egg,
    imgClass: "w-35 h-35",
    ...ANIMAL_BALANCE[4],
  },
  {
    id: 5,
    name: "cooked?", dbKey: "phx",
    desc: "burnt.",
    img: phx,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[5],
  },
  {
    id: 6,
    name: "no ball games in lounge.", dbKey: "ball",
    desc: "#lastwarning",
    img: ball,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[6],
  },

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
