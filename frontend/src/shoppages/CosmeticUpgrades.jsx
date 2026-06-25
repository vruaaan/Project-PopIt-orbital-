import { COSMETICS, PRICE_CHIP_ICON } from '../lib/shopConstants'

export default function CosmeticUpgrades({
  count,
  setCount,
  cosmeticOwned,
  setCosmeticOwned,
  equippedCosmetic,
  setEquippedCosmetic
}) {

  function buy(item) {
    if (cosmeticOwned[item.id]) return;
    if (count >= item.price) {
      setCount(c => c - item.price);
      setCosmeticOwned(prev => ({ ...prev, [item.id]: true }));
    } else {
      alert("Not enough chips!");
    }
  }

  return (
    <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
      {COSMETICS.map(item => {
        const owned = cosmeticOwned[item.id] ?? false;
        const equipped = equippedCosmetic === item.id;
        return (
          <div key={item.id} className={`cosmetic-card min-w-[240px] ${equipped ? "cosmetic-card--owned" : ""}`}>
            <img src={item.img} alt={item.name} className="w-48 h-48 object-contain" />
            <div className="text-center flex-1">
              <h3 className="shop-cosmetic-title">{item.name}</h3>
            </div>
            {owned ? (
              <button
                type="button"
                onClick={() => setEquippedCosmetic(item.id)}
                className="btn-upgrade px-6 py-2"
                disabled={equipped}
              >
                {equipped ? "Equipped" : "Equip"}
              </button>
            ) : (
              <div className="upgrade-action">
                <button
                  type="button"
                  onClick={() => buy(item)}
                  className="btn-upgrade px-6 py-2"
                >
                  Unlock
                </button>
                <span className="pill flex items-center gap-1">{item.price} <img src={PRICE_CHIP_ICON} alt="chips" className="w-8 h-8 object-contain" /></span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
