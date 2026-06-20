import threechips from '../assets/threechips.png'
import defaultcan from '../assets/plain can.png'
import sealcan from '../assets/sealcan.png'
import cowcan from '../assets/cowcan.png'
import dolpcan from '../assets/dolphincan.png'


const COSMETICS = [
  { id: 1, name: "Original", img : defaultcan, price :10000 },
  { id: 2, name: "Truffle", img: sealcan, price: 10000 },
  { id: 3, name: "Sour Cream 'n Onion", img: cowcan, price: 10000 },
  { id: 4, name: "Barbeque", img: dolpcan, price:10000 }
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
        return (
          <div key={item.id} className={`cosmetic-card ${owned ? "cosmetic-card--owned" : ""}`}>
            <img src={item.img} alt={item.name} className="w-48 h-48 object-contain" />
            <div className="text-center flex-1">
              <h3 className="shop-cosmetic-title">{item.name}</h3>
            </div>
            {owned ? (
              <button
                type="button"
                onClick={() => setEquippedCosmetic(item.id)}
                className="btn-upgrade px-6 py-2"
                disabled={equippedCosmetic === item.id}
              >
                {equippedCosmetic === item.id ? "Equipped" : "Equip"}
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
