import threechips from '../assets/threechips.png'
const CLICK_UPGRADES = [
  { id: 1, name: "Lazy Feeder", desc: "Free your hands, automatically popping chips", baseCost: 50,  costScale: 1.5, powerPerLevel: 1 },
  { id: 2, name: "Flavour Town",  desc: "Flavour your chips with each upgrade, increasing the value of each chip popped !", baseCost: 150, costScale: 1.8, powerPerLevel: 2 },
];

function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level));
}

export default function ClickUpgrades({ count, setCount, clickLevels, setClickLevels, setClickPower }) {

  function upgrade(item) {
    const lvl = clickLevels[item.id] ?? 0;
    const cost = calcCost(item.baseCost, item.costScale, lvl);
    if (count >= cost) {
      setCount(c => c - cost);
      setClickLevels(prev => ({ ...prev, [item.id]: lvl + 1 }));
      setClickPower(p => p + item.powerPerLevel);
    } else {
      alert("Not enough chips!");
    }
  }

  return (
    <div className="shop-upgrade-list">
      {CLICK_UPGRADES.map(item => {
        const lvl = clickLevels[item.id] ?? 0;
        const cost = calcCost(item.baseCost, item.costScale, lvl);
        const totalPower = item.powerPerLevel * lvl;

        return (
          <div key={item.id} className={`shop-upgrade-card ${lvl > 0 ? "shop-upgrade-card--owned" : ""}`}>
            <div className="shop-upgrade-row">
              <div>
                <h3 className="shop-upgrade-title">{item.name}</h3>
                <p className="shop-upgrade-desc">{item.desc}</p>
                <p className="shop-upgrade-meta">
                  Level {lvl} — +{totalPower} click power total
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="pill">{cost} chips</span>
                <button
                  type="button"
                  onClick={() => upgrade(item)}
                  className="btn-upgrade px-6 py-2"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}