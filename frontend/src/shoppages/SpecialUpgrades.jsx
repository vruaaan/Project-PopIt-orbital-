import { ANIMALS } from '../lib/animalLogic' // animal images from here 
import { ANIMAL_BALANCE, PRICE_CHIP_ICON, calcAnimalChance, calcCost, calcStat } from '../lib/shopConstants' 

export default function SpecialUpgrades({ count, setCount, animalLevels, setAnimalLevels }) {
  function unlockAnimal(animal) {
    const state = animalLevels[animal.id];
    const balance = ANIMAL_BALANCE[animal.id]
    if (state.owned) return;
    if (count >= balance.chance.baseCost) {
      setCount(c => c - balance.chance.baseCost);
      setAnimalLevels(prev => ({
        ...prev,
        [animal.id]: {
          ...prev[animal.id],
          owned: true,
          chanceLvl: 1
        }
      }));
    } else {
      alert("Not enough chips!");
    }
  }

  function upgradeChance(animal) {
    const state = animalLevels[animal.id];
    const balance = ANIMAL_BALANCE[animal.id]
    const cost = calcCost(balance.chance.baseCost, balance.chance.costScale, state.chanceLvl);
    if (count >= cost) {
      setCount(c => c - cost);
      setAnimalLevels(prev => ({ ...prev, [animal.id]: { ...prev[animal.id], chanceLvl: prev[animal.id].chanceLvl + 1 } }));
    } else {
      alert("Not enough chips!");
    }
  }

  function upgradeMultiplier(animal) {
    const state = animalLevels[animal.id];
    const balance = ANIMAL_BALANCE[animal.id]
    const cost = calcCost(balance.multiplier.baseCost, balance.multiplier.costScale, state.multLvl);
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
        const balance = ANIMAL_BALANCE[animal.id]
        const isOwned = state.owned;
        const currentChance = calcAnimalChance(animal.id, state.chanceLvl)
        const currentMult = calcStat(balance.multiplier.base, balance.multiplier.perLevel, state.multLvl);
        const chanceCost = calcCost(balance.chance.baseCost, balance.chance.costScale, state.chanceLvl);
        const multCost = calcCost(balance.multiplier.baseCost, balance.multiplier.costScale, state.multLvl);
        return (
          <div key={animal.id} className="shop-upgrade-card">
            {/* Top row: image + name/desc + unlock or owned pill */}
            <div className="shop-upgrade-row gap-6">
              <img src={animal.img} alt={animal.name} className={`${animal.imgClass} object-contain shrink-0`} />
              <div className="upgrade-text-block">
                <h3 className="shop-upgrade-title">{animal.name}</h3>
                <p className="shop-upgrade-desc">{animal.desc}</p>
              </div>
              {!isOwned && (
                <div className="upgrade-action upgrade-action--right">
                  <button
                    type="button"
                    onClick={() => unlockAnimal(animal)}
                    className="btn-upgrade px-6 py-2"
                  >
                    Unlock
                  </button>
                  <span className="pill flex items-center gap-1">{balance.chance.baseCost} <img src={PRICE_CHIP_ICON} alt="chips" className="w-8 h-8 object-contain" /></span>
                </div>
              )}
            </div>

            {/* Upgrade rows: only shown after unlocking */}
            {isOwned && (
              <div className="mt-6 flex flex-col gap-4">

                {/* Upgrade Probability */}
                <div className="shop-upgrade-row">
                  <div className="upgrade-text-block">
                    <p className="shop-upgrade-title">Spawn Chance</p>
                    <p className="shop-upgrade-meta">Level {state.chanceLvl} → {currentChance}%</p>
                  </div>
                  <div className="upgrade-action">
                    <button
                      type="button"
                      onClick={() => upgradeChance(animal)}
                      className="btn-upgrade px-5 py-2"
                    >
                      {chanceCost}<img src={PRICE_CHIP_ICON} alt="chips" className="w-8 h-8 object-contain" />
                    </button>
                  </div>
                </div>

                {/* Upgrade Value */}
                <div className="shop-upgrade-row">
                  <div className="upgrade-text-block">
                    <p className="shop-upgrade-title">Value</p>
                    <p className="shop-upgrade-meta">Level {state.multLvl} → {currentMult}x</p>
                  </div>
                  <div className="upgrade-action">
                    <button
                      type="button"
                      onClick={() => upgradeMultiplier(animal)}
                      className="btn-upgrade px-5 py-2"
                    >
                      {multCost} <img src={PRICE_CHIP_ICON} alt="chips" className="w-8 h-8 object-contain" />
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
