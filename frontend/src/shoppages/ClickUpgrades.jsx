import threechips from '../assets/threechips.png'
import clicker from '../assets/clicker icon.png'
import saltnpepper from '../assets/saltnpepper.png'
const CLICK_UPGRADES = [
  { id: 1, name: "Click...Click...Boom!", db_name: "auto_popper", img: clicker, imgClass:"w-25 h-25", desc: "Free your hand, click your can ", baseCost: 50,  costScale: 1.5, powerPerLevel: 1 },
  { id: 2, name: "Salt 'n Pepper Shaker", db_name: "click_pow", img: saltnpepper, imgClass:"w-30 h-30", desc: "Flavour your chips with each upgrade, increasing the value of each chip popped !", baseCost: 150, costScale: 1.8, powerPerLevel: 2 },
];

function calcCost(baseCost, costScale, level) {
  return Math.floor(baseCost * Math.pow(costScale, level));
}

export default function ClickUpgrades({ count, setCount, clickLevels, setClickLevels, setClickPower, profile }) {

  function upgrade(item) {
    const lvl = clickLevels[item.id] ?? 0; // level of upgrade
    const cost = calcCost(item.baseCost, item.costScale, lvl); // cost of upgrade
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
        const isUnlocked = profile ? (profile[item.db_name] ?? 0) > 0 : lvl > 0

        return (
          <div key={item.id} className={`shop-upgrade-card ${lvl > 0 ? "shop-upgrade-card--owned" : ""}`}>
            <div className="shop-upgrade-row">
              <img src={item.img} alt={item.name} className={`${item.imgClass} object-contain shrink-0`}/>
              <div className="flex-1 text-left ">
                <h3 className="shop-upgrade-title">{item.name}</h3>
                <p className="shop-upgrade-desc">{item.desc}</p>
                <p className="shop-upgrade-meta">Level {lvl} — +{totalPower} click power total</p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span className="pill">{cost} chips</span>
                <button type="button" onClick={() => upgrade(item)} className="btn-upgrade px-6 py-2">
                  {isUnlocked ? "Upgrade" : "Unlock"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}