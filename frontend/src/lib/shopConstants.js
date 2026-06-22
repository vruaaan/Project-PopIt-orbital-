import threechips from '../assets2/threechips.webp' // used at pricing, small scale so reduced in size
import clicker from '../assets/clicker icon.png' // static render use small
import saltnpepper from '../assets2/saltnpepper.webp'  // webp version used as massively oversized
import defaultcan from '../assets2/plain can.webp'
import sealcan from '../assets2/sealcan.webp'
import cowcan from '../assets2/cowcan.webp'
import dolpcan from '../assets2/dolphincan.webp'
import star from '../assets/star.png'



export const PRICE_CHIP_ICON = threechips

export const SHOP_CATEGORIES = [ // 3 tabs of the shop
  { name: "Pop!", img: threechips},
  { name: "Specials", img: star
  },
  { name: "Cosmetics", img: defaultcan },
]

// DETAILS FOR Pop! TAB
export const CLICK_UPGRADE_BALANCE = { 
  1: {
    baseCost: 50,
    costScale: 1.5,
    powerPerLevel: 1,
  },
  2: {
    baseCost: 150,
    costScale: 1.8,
    powerPerLevel: 2,
  },
}

export const CLICK_UPGRADES = [
  { id: 1, name: "Click...Click...Boom!", db_name: "auto_popper", img: clicker, imgClass:"w-25 h-25", desc: "Free your hand, click your can ", ...CLICK_UPGRADE_BALANCE[1] },
  { id: 2, name: "Salt 'n Pepper Shaker", db_name: "click_pow", img: saltnpepper, imgClass:"w-30 h-30", desc: "Flavour your chips with each upgrade, increasing the value of each chip popped !", ...CLICK_UPGRADE_BALANCE[2] },
]



// DETAILS FOR Specials TAB
export const ANIMAL_CHANCE_FORMULA = {
  logScale: 5.6,
  logOffset: 1,
  baseChance: 5,
}

export function calcAnimalChance(level) {
  const { logScale, logOffset, baseChance } = ANIMAL_CHANCE_FORMULA
  return Math.floor(logScale * Math.log2(level + logOffset) + baseChance)
}

export const ANIMAL_BALANCE = {
  1: {
    chance: { base: 5, perLevel: 2, baseCost: 200, costScale: 1.8 },
    multiplier: { base: 2, perLevel: 1, baseCost: 300, costScale: 2.0 },
  },
  2: {
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  },
  3: {
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  },
}

export function calcStat(base, perLevel, level) {
  return +(base + perLevel * level).toFixed(1)
}

// DETAILS FOR COSMETICS TAB
export const COSMETICS = [
  { id: 1, name: "Original", img : defaultcan, price: 10000 },
  { id: 2, name: "Truffle", img: sealcan, price: 10000 },
  { id: 3, name: "Sour Cream 'n Onion", img: cowcan, price: 10000 },
  { id: 4, name: "Barbeque", img: dolpcan, price: 10000 },
]

// function to calculate cost for click and specials
export function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level))
}