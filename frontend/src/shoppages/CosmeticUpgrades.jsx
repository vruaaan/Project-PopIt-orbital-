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

export default function CosmeticUpgrades({ count, setCount, cosmeticOwned, setCosmeticOwned }) {

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
    <div className="mt-8 grid grid-cols-2 gap-6">
      {COSMETICS.map(item => {
        const owned = cosmeticOwned[item.id] ?? false;
        return (
          <div key={item.id} className={`shop-upgrade-card flex flex-col items-center gap-4 ${owned ? "shop-upgrade-card--owned" : ""}`}>
            <img src={item.img} alt={item.name} className="w-32 h-32 object-contain" />
            <div className="text-center flex-1">
              <h3 className="shop-upgrade-title">{item.name}</h3>
              <p className="shop-upgrade-desc mt-1">{item.desc}</p>
            </div>
            {owned ? (
              <span className="pill">Owned</span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="pill">{item.price} chips</span>
                <button
                  type="button"
                  onClick={() => buy(item)}
                  className="btn-upgrade px-6 py-2"
                >
                  Buy
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
