import seal from '../assets/seal.webp' 
import cow from '../assets/cow.webp' 
import dol from '../assets/dolphin.webp'
import egg from '../assets/egg.png' // egg png sufficiently small
import flame from '../assets/flame.png'
import ball from '../assets/ball.webp'
import shuttle from '../assets/shuttlecock.webp'
import { ANIMAL_BALANCE, calcAnimalChance } from './shopConstants'

export const ANIMALS = [
  {
    id: 1, 
    name: "the original popit", dbKey: "seal",
    desc: "Not fake, not slim, not shady",
    img: seal,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[1],
  },
  {
    id: 2,
    name: "moooooo", dbKey: "cow",
    desc: "aerodynamically accurate",
    img: cow,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[2],
  },
  {
    id: 3,
    name: "what is this???", dbKey: "dol",
    desc: "have we gone too far...",
    img: dol,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[3],
  },
  {
    id: 4,
    name: "lawrence", dbKey: "egg",
    desc: "#eatenbytheegg",
    img: egg,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[4],
  },
  {
    id: 5,
    name: "fire", dbKey: "phx",
    desc: "burnt.",
    img: flame,
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
  {
    id: 7,
    name: "batminton man", dbKey: "shuttle",
    desc: "baddie",
    img: shuttle,
    imgClass: "w-24 h-24",
    ...ANIMAL_BALANCE[7],
  },

]

export function calcAnimalBonus(animalLevels) {
  let bonusMultiplier = 1
  const procdAnimals = []

  ANIMALS.forEach((animal) => {
    const state = animalLevels[animal.id]
    if (!state?.owned) return

    const chance = calcAnimalChance(animal.id, state.chanceLvl)
    const mult = animal.multiplier.base + animal.multiplier.perLevel * state.multLvl
    if (Math.random() * 100 < chance) {
      bonusMultiplier *= mult
      procdAnimals.push(animal.img)
    }
  })

  return { multiplier: bonusMultiplier, procdAnimals }
}
