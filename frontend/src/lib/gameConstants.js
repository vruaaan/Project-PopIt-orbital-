export const CLICK_POWER_BASE = 1

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

export const ANIMAL_CHANCE_FORMULA = {
  logScale: 5.6,
  logOffset: 1,
  baseChance: 5,
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

export const COSMETIC_PRICES = {
  1: 10000,
  2: 10000,
  3: 10000,
  4: 10000,
}

export function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level))
}

export function calcStat(base, perLevel, level) {
  return +(base + perLevel * level).toFixed(1)
}

export function calcAnimalChance(level) {
  const { logScale, logOffset, baseChance } = ANIMAL_CHANCE_FORMULA
  return Math.floor(logScale * Math.log2(level + logOffset) + baseChance)
}
