import threechips from '../assets/threechips.png' // update later
import defaultcan from '../assets/plain can.png' // update later
import sealcan from '../assets/sealcan.png' // update later
import cowcan from '../assets/cowcan.webp' 
import dolpcan from '../assets/dolphincan.webp'
import { COSMETIC_PRICES } from '../lib/gameConstants'


const COSMETICS = [
  { id: 1, name: "Original", img : defaultcan, price: COSMETIC_PRICES[1] },
  { id: 2, name: "Truffle", img: sealcan, price: COSMETIC_PRICES[2] },
  { id: 3, name: "Sour Cream 'n Onion", img: cowcan, price: COSMETIC_PRICES[3] },
  { id: 4, name: "Barbeque", img: dolpcan, price: COSMETIC_PRICES[4] }
];

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
    <div className="mt-8 grid grid-cols-4 gap-6">
      {COSMETICS.map(item => {
        const owned = cosmeticOwned[item.id] ?? false;
        const equipped = equippedCosmetic === item.id;
        return (
          <div key={item.id} className={`cosmetic-card ${equipped ? "cosmetic-card--owned" : ""}`}>
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
                <span className="pill flex items-center gap-1">{item.price} <img src={threechips} alt="chips" className="w-8 h-8 object-contain" /></span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
