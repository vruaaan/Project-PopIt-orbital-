import threechips from '../assets/threechips.png'
import clicker from '../assets/clicker icon.png'
import saltnpepper from '../assets/saltnpepper.png'
import { CLICK_UPGRADE_BALANCE, calcCost } from '../lib/gameConstants'

const CLICK_UPGRADES = [
  { id: 1, name: "Click...Click...Boom!", db_name: "auto_popper", img: clicker, imgClass:"w-25 h-25", desc: "Free your hand, click your can ", ...CLICK_UPGRADE_BALANCE[1] },
  { id: 2, name: "Salt 'n Pepper Shaker", db_name: "click_pow", img: saltnpepper, imgClass:"w-30 h-30", desc: "Flavour your chips with each upgrade, increasing the value of each chip popped !", ...CLICK_UPGRADE_BALANCE[2] },
];

export default function ClickUpgrades({ count, setCount, clickLevels, setClickLevels, setClickPower }) {

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
        const isUnlocked = lvl > 0

        return (
          <div key={item.id} className="shop-upgrade-card">
            <div className="shop-upgrade-row">
              <div className="upgrade-img-box">
                <img src={item.img} alt={item.name} className={`${item.imgClass} object-contain`}/>
              </div>
              <div className="upgrade-text-block">
                <h3 className="shop-upgrade-title">{item.name}</h3>
                <p className="shop-upgrade-desc">{item.desc}</p>
                <p className="shop-upgrade-meta">Level {lvl} — +{totalPower} click power total</p>
              </div>
              <div className="upgrade-action upgrade-action--right">
                <button type="button" onClick={() => upgrade(item)} className="btn-upgrade px-6 py-2">
                  {isUnlocked ? "Upgrade" : "Unlock"}
                </button>
                <span className="pill flex items-center gap-1">{cost} <img src={threechips} alt="chips" className="w-8 h-8 object-contain" /></span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
