import threechips from '../assets/threechips.png'
import defailt from '../assets/plain can.png'
import sealcan from '../assets/sealcan.png'
import cowcan from '../assets/cowcan.png'
import dolcan from '../assets/dolphincan.png'

const COSMETICS = [
  { id: 1, name: "Default",   desc: "Your can becomes covered in a thick layer of seal blubber.",  price: 10000 },
  { id: 2, name: "Seal Can",    desc: "Your can becomes blessed by the spherical cow.",               price: 25000 },
  { id: 1, name: "Cow Can",   desc: "Your can becomes covered in a thick layer of seal blubber.",  price: 10000 },
  { id: 2, name: "Dolphin Can",    desc: "Your can becomes blessed by the spherical cow.",               price: 25000 },
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
    <div className="shop-upgrade-list">
      {COSMETICS.map(item => {
        const owned = cosmeticOwned[item.id] ?? false;

        return (
          <div key={item.id} className={`shop-upgrade-card ${owned ? "shop-upgrade-card--owned" : ""}`}>
            <div className="shop-upgrade-row">
              <div>
                <h3 className="shop-upgrade-title">{item.name}</h3>
                <p className="shop-upgrade-desc">{item.desc}</p>
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
          </div>
        );
      })}
    </div>
  );
}