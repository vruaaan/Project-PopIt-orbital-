import { CLICK_UPGRADES, PRICE_CHIP_ICON, calcCost} from '../lib/shopConstants' 

export default function ClickUpgrades({ count, setCount, clickLevels, setClickLevels}) {

  function upgrade(item) {
    const lvl = clickLevels[item.id] ?? 0; // level of upgrade
    const cost = calcCost(item.baseCost, item.costScale, lvl); // cost of upgrade
    if (count >= cost) {
      setCount(c => c - cost);
      setClickLevels(prev => ({ ...prev, [item.id]: lvl + 1 }));
    } else {
      alert("Not enough chips!");
    }
  }

  return (
    <div className="shop-upgrade-list">
      {CLICK_UPGRADES.map(item => {
        const lvl = clickLevels[item.id] ?? 0;
        const cost = calcCost(item.baseCost, item.costScale, lvl);
        const totalPower = item.id === 3 ? 2 ** lvl : item.powerPerLevel * lvl;
        const isUnlocked = lvl > 0
        const powerLabel = item.id === 3
          ? `x${totalPower} chip power`
          : `+${totalPower} click power total`

        return (
          <div key={item.id} className="shop-upgrade-card">
            <div className="shop-upgrade-row">
              <div className="upgrade-img-box">
                <img src={item.img} alt={item.name} className={`${item.imgClass} object-contain`}/>
              </div>
              <div className="upgrade-text-block">
                <h3 className="shop-upgrade-title">{item.name}</h3>
                <p className="shop-upgrade-desc">{item.desc}</p>
                <p className="shop-upgrade-meta">Level {lvl} — {powerLabel}</p>
              </div>
              <div className="upgrade-action upgrade-action--right">
                <button type="button" onClick={() => upgrade(item)} className="btn-upgrade px-6 py-2">
                  {isUnlocked ? "Upgrade" : "Unlock"}
                </button>
                <span className="pill flex items-center gap-1">{cost} <img src={PRICE_CHIP_ICON} alt="chips" className="w-8 h-8 object-contain" /></span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
