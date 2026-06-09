const CLICK_UPGRADES = [
  { id: 1, name: "Auto-Popper v1", desc: "Automatically pops 1 can every second.",       baseCost: 50,  costScale: 1.5, powerPerLevel: 1 },
  { id: 2, name: "Golden Fizz",    desc: "Doubles the value of every manual pop.",        baseCost: 150, costScale: 1.8, powerPerLevel: 2 },
  { id: 3, name: "Mega Factory",   desc: "Supercharges all automatic poppers by 5x.",     baseCost: 500, costScale: 2.0, powerPerLevel: 5 },
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
    <div className="flex flex-col gap-6 mt-8">
      {CLICK_UPGRADES.map(item => {
        const lvl = clickLevels[item.id] ?? 0;
        const cost = calcCost(item.baseCost, item.costScale, lvl);
        const totalPower = item.powerPerLevel * lvl;

        return (
          <div key={item.id} className={`rounded-2xl border p-6 transition-all ${lvl > 0 ? "border-[#b55334] bg-[#b55334]/5" : "border-[#d4a792] bg-white/40"}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif text-[#b55334]">{item.name}</h3>
                <p className="text-[#8d5d46] mt-1">{item.desc}</p>
                <p className="text-[#8d5d46] text-sm mt-2">
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