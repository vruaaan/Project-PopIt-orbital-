import seal from '../assets/seal.png'
import cow from '../assets/cow.png'
import dol from '../assets/dolphin.png'

const ANIMALS = [
  {
    id: 1,
    name: "Hit the sealion!",
    desc: "Not fake, not slim, not shady",
    img: seal,
    imgClass: "w-24 h-24",
    db_prob: "seal_prob",
    db_cp: "seal_cp",
    chance: { base: 5, perLevel: 2, baseCost: 200, costScale: 1.8 },
    multiplier: { base: 2, perLevel: 1, baseCost: 300, costScale: 2.0 },
  },
  {
    id: 2,
    name: "Got milk?",
    desc: "Aerodynamically accurate",
    img: cow,
    imgClass: "w-24 h-24",
    db_prob: "cow_prob",
    db_cp: "cow_cp",
    chance: { base: 3, perLevel: 1.5, baseCost: 350, costScale: 2.0 },
    multiplier: { base: 3, perLevel: 1.5, baseCost: 500, costScale: 2.2 },
  },
  {
    id: 3,
    name: "What do i put here",
    desc: "Anatomically accurate",
    img: dol,
    imgClass: "w-24 h-24",
    db_prob: "dol_prob",
    db_cp: "dol_cp",
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

export default function SpecialUpgrades({ count, setCount, animalLevels, setAnimalLevels, profile }) {
  function unlockAnimal(animal) {
    const state = animalLevels[animal.id];
    if (state.owned) return;
    if (count >= animal.chance.baseCost) {
      setCount(c => c - animal.chance.baseCost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], owned: true } }));
    } else {
      alert("Not enough chips!");
    }
  }

  function upgradeChance(animal) {
    const state = animalLevels[animal.id];
    const cost = calcCost(animal.chance.baseCost, animal.chance.costScale, state.chanceLvl);
    if (count >= cost) {
      setCount(c => c - cost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], chanceLvl: prev[animal.id].chanceLvl + 1 } }));
    } else {
      alert("Not enough chips!");
    }
  }

  function upgradeMultiplier(animal) {
    const state = animalLevels[animal.id];
    const cost = calcCost(animal.multiplier.baseCost, animal.multiplier.costScale, state.multLvl);
    if (count >= cost) {
      setCount(c => c - cost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], multLvl: prev[animal.id].multLvl + 1 } }));
    } else {
      alert("Not enough chips!");
    }
  }

  return (
    <div className="shop-upgrade-list">
      {ANIMALS.map(animal => {
        const state = animalLevels[animal.id];

        // check backend first, fall back to local state
        const isOwned = profile
          ? (profile[animal.db_prob] ?? 0) > 0 || state.owned
          : state.owned;

        const currentChance = calcStat(animal.chance.base, animal.chance.perLevel, state.chanceLvl);
        const currentMult = calcStat(animal.multiplier.base, animal.multiplier.perLevel, state.multLvl);
        const chanceCost = calcCost(animal.chance.baseCost, animal.chance.costScale, state.chanceLvl);
        const multCost = calcCost(animal.multiplier.baseCost, animal.multiplier.costScale, state.multLvl);

        return (
          <div key={animal.id} className={`shop-upgrade-card ${isOwned ? "shop-upgrade-card--owned" : ""}`}>
            {/* Top row: image + name/desc + unlock or owned pill */}
            <div className="shop-upgrade-row gap-6">
              <img src={animal.img} alt={animal.name} className={`${animal.imgClass} object-contain shrink-0`} />
              <div className="flex-1 text-left">
                <h3 className="shop-upgrade-title">{animal.name}</h3>
                <p className="shop-upgrade-desc">{animal.desc}</p>
              </div>
              {!isOwned ? (
                <div className="ml-auto flex items-center gap-3">
                  <span className="pill">{animal.chance.baseCost} chips</span>
                  <button
                    type="button"
                    onClick={() => unlockAnimal(animal)}
                    className="btn-upgrade px-6 py-2"
                  >
                    Unlock
                  </button>
                </div>
              ) : (
                <span className="pill ml-auto">Owned</span>
              )}
            </div>

            {/* Upgrade rows: only shown after unlocking */}
            {isOwned && (
              <div className="mt-6 flex flex-col gap-4">

                {/* Upgrade Probability */}
                <div className="shop-upgrade-row">
                  <div className="flex-1 text-left">
                    <p className="shop-upgrade-title">Spawn Chance</p>
                    <p className="shop-upgrade-meta">Level {state.chanceLvl} → {currentChance}%</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pill">{chanceCost} chips</span>
                    <button
                      type="button"
                      onClick={() => upgradeChance(animal)}
                      className="btn-upgrade px-5 py-2"
                    >
                      Upgrade Chance
                    </button>
                  </div>
                </div>

                {/* Upgrade Value */}
                <div className="shop-upgrade-row">
                  <div className="flex-1 text-left">
                    <p className="shop-upgrade-title">Chip Value</p>
                    <p className="shop-upgrade-meta">Level {state.multLvl} → {currentMult}x</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pill">{multCost} chips</span>
                    <button
                      type="button"
                      onClick={() => upgradeMultiplier(animal)}
                      className="btn-upgrade px-5 py-2"
                    >
                      Upgrade Value
                    </button>
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