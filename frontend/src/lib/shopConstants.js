import threechips from '../assets/threechips.webp' // used at pricing, small scale so reduced in size
import chip from '../assets/chip1.webp'
import clicker from '../assets/clicker icon.png' // static render use small
import saltnpepper from '../assets/saltnpepper.webp'  // webp version used as massively oversized
import defaultcan from '../assets/plain can.webp'
import sealcan from '../assets/sealcan.webp'
import cowcan from '../assets/cowcan.webp'
import dolpcan from '../assets/dolphincan.webp'
import flamecan from '../assets/flamecan.webp'
import eggcan from '../assets/eggcan.webp'
import star from '../assets/star.png'
import doubler from '../assets/doubler.webp'



export const PRICE_CHIP_ICON = threechips

export const SHOP_CATEGORIES = [ // 3 tabs of the shop
  { name: "Pop!", img: threechips},
  { name: "Specials", img: star},
  { name: "Cosmetics", img: defaultcan },
]

// DETAILS FOR Pop! TAB
export const CLICK_UPGRADE_BALANCE = { 
  1: {
    baseCost: 50,
    costScale: 1.5,
    powerPerLevel: 1,
    effectType: 'additive',
  },
  2: {
    baseCost: 250,
    costScale: 1.8,
    powerPerLevel: 2,
    effectType: 'additive',
  },
  3: {
    baseCost: 1000,
    costScale: 2.2,
    powerPerLevel: 5,
    effectType: 'additive',
  },
  4: {
    baseCost: 2000,
    costScale: 100,
    powerPerLevel: 0,
    effectType: 'multiplier',
    multiplier: 2,
  },
}

export const CLICK_UPGRADES = [
  { id: 1, name: "Click...Click...Boom!", dbKey: "click_pow1", img: clicker, imgClass:"w-25 h-25", desc: "Free your hand, click your can ", ...CLICK_UPGRADE_BALANCE[1] },
  { id: 2, name: "Salt 'n Pepper", dbKey: "click_pow2", img: saltnpepper, imgClass:"w-30 h-30", desc: "Flavour your chips with each upgrade, increasing the value of each chip popped !", ...CLICK_UPGRADE_BALANCE[2] },
  { id: 3, name: "Mega Chip", dbKey: "click_pow5", img: chip, imgClass:"w-30 h-25 rotate-290", desc: "Make your chips mega!", ...CLICK_UPGRADE_BALANCE[3] },
  { id: 4, name: "Double Down", dbKey: "chip_mult", img: doubler, imgClass:"w-25 h-35", desc: "Every purchase doubles your current chip power, so your clicks snowball fast.", ...CLICK_UPGRADE_BALANCE[4] },
]



// DETAILS FOR Specials TAB
export const ANIMAL_CHANCE_FORMULA = {
  logScale: 5.6,
  logOffset: 1,
  baseChance: 5,
}

export function calcAnimalChance(id, level) {
  const { logScale, logOffset, baseChance } = ANIMAL_CHANCE_FORMULA
  const balance = ANIMAL_BALANCE[id]
  const constant = balance?.chance?.constant ?? 0
  return Math.floor((logScale * Math.log2(level + logOffset) + baseChance)*constant)
}

export const ANIMAL_BALANCE = {
  1: {
    chance: {baseCost: 200, costScale: 1.8, constant: 1.0},
    multiplier: { base: 2, perLevel: 1, baseCost: 300, costScale: 2.0 },
  },
  2: {
    chance: {baseCost: 500, costScale: 2.0, constant: 0.9 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  },
  3: {
    chance: {baseCost: 1000, costScale: 2.0, constant: 0.8 },
    multiplier: { base: 5, perLevel: 1.5, baseCost: 1200, costScale: 2.5 },
  },
  4: {
    chance: {baseCost: 1500, costScale: 2.0, constant: 0.7 },
    multiplier: { base: 10, perLevel: 1.5, baseCost: 2000, costScale: 2.5 },
  },
   5: {
    chance: {baseCost: 2500, costScale: 2.0, constant: 0.6 },
    multiplier: { base: 20, perLevel: 1.5, baseCost: 3000, costScale: 2.5 },
  },
  6: {
    chance: {baseCost: 5000, costScale: 2.0, constant: 0.5},
    multiplier: { base: 50, perLevel: 1.5, baseCost: 6000, costScale: 2.5 },
  },
  7: {
    chance: {baseCost: 5000, costScale: 2.0, constant: 0.5},
    multiplier: { base: 50, perLevel: 1.5, baseCost: 6000, costScale: 2.5 },
  },
}

export function calcStat(base, perLevel, level) {
  return +(base + perLevel * level).toFixed(1)
}

// DETAILS FOR COSMETICS TAB
export const COSMETICS = [
  { id: 1, name: "Original", dbKey: "original", img : defaultcan, price: 10000 },
  { id: 2, name: "Truffle", dbKey: "truffle", img: sealcan, price: 10000 },
  { id: 3, name: "Sour Cream 'n Onion", dbKey: "sour_cream_n_onion", img: cowcan, price: 10000 },
  { id: 4, name: "Barbeque", dbKey: "barbeque", img: dolpcan, price: 10000 },
  { id: 5, name: "Hot 'n Spicy", dbKey: "spicy", img: flamecan, price: 10000 },
  { id: 6, name: "Milkshake", dbKey: "egg", img: eggcan, price: 10000 },
]

// function to calculate cost for click and specials
export function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level))
}
