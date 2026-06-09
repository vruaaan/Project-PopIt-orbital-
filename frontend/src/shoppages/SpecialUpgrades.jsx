import threechips from '../assets/threechips.png'
import seal from '../assets/seal.png'
import cow from '../assets/cow.png'
import dol from '../assets/dolphin.png'

const ANIMALS = [
  {
    id: 1,
    name: "Seal",
    desc: "Neither fake, slim nor shady",
    chance: { base: 5, perLevel: 2, baseCost: 200, costScale: 1.8 },
    multiplier: { base: 2, perLevel: 1, baseCost: 300, costScale: 2.0 },
  },
  {
    id: 2,
    name: "Cow",
    desc: "Aerodynamically accurate",
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  },
  {
    id: 3,
    name: "Dolphin",
    desc: "Anatomically accurate",
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  }
];

function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level));
}

function calcStat(base, perLevel, level) {
  return +(base + perLevel * level).toFixed(1);
}

export default function SpecialUpgrades({ count, setCount, animalLevels, setAnimalLevels }) {

  function buyAnimal(animal) {
    const state = animalLevels[animal.id];
    if (state.owned) return;
    if (count >= animal.chance.baseCost) {
      setCount(count - animal.chance.baseCost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], owned: true } }));
    } else {
      alert("Not enough chips!");
    }
  }

  function upgradeChance(animal) {
    const state = animalLevels[animal.id];
    const cost = calcCost(animal.chance.baseCost, animal.chance.costScale, state.chanceLvl);
    if (count >= cost) {
      setCount(count - cost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], chanceLvl: prev[animal.id].chanceLvl + 1 } }));
    } else {
      alert("Not enough chips!");
    }
  }

  function upgradeMultiplier(animal) {
    const state = animalLevels[animal.id];
    const cost = calcCost(animal.multiplier.baseCost, animal.multiplier.costScale, state.multLvl);
    if (count >= cost) {
      setCount(count - cost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], multLvl: prev[animal.id].multLvl + 1 } }));
    } else {
      alert("Not enough chips!");
    }
  }

  return (
    <div className="shop-upgrade-list">
      {ANIMALS.map(animal => {
        const state = animalLevels[animal.id];
        const currentChance = calcStat(animal.chance.base, animal.chance.perLevel, state.chanceLvl);
        const currentMult = calcStat(animal.multiplier.base, animal.multiplier.perLevel, state.multLvl);
        const chanceCost = calcCost(animal.chance.baseCost, animal.chance.costScale, state.chanceLvl);
        const multCost = calcCost(animal.multiplier.baseCost, animal.multiplier.costScale, state.multLvl);

        return (
          <div key={animal.id} className={`shop-upgrade-card ${state.owned ? "shop-upgrade-card--owned" : ""}`}>
            <div className="shop-upgrade-row">
              <div>
                <h3 className="shop-upgrade-title">{animal.name}</h3>
                <p className="shop-upgrade-desc">{animal.desc}</p>
              </div>
              {!state.owned ? (
                <button type="button" onClick={() => buyAnimal(animal)} className="btn-upgrade px-6 py-2">
                  Buy — {animal.chance.baseCost} chips
                </button>
              ) : (
                <span className="pill">Owned</span>
              )}
            </div>

            {state.owned && (
              <div className="mt-6 flex flex-col gap-4">
                <div className="shop-upgrade-row">
                  <div>
                    <p className="font-serif text-[#b55334]">Trigger Chance</p>
                    <p className="shop-upgrade-meta">Level {state.chanceLvl} → {currentChance}%</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pill">{chanceCost} chips</span>
                    <button type="button" onClick={() => upgradeChance(animal)} className="btn-upgrade px-5 py-2">Upgrade</button>
                  </div>
                </div>

                <div className="shop-upgrade-row">
                  <div>
                    <p className="font-serif text-[#b55334]">Multiplier</p>
                    <p className="shop-upgrade-meta">Level {state.multLvl} → {currentMult}x</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pill">{multCost} chips</span>
                    <button type="button" onClick={() => upgradeMultiplier(animal)} className="btn-upgrade px-5 py-2">Upgrade</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}