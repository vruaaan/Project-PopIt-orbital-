const COSMETICS = [
  { id: 1, name: "Seal Can",   desc: "Your can becomes covered in a thick layer of seal blubber.",  price: 10000 },
  { id: 2, name: "Cow Can",    desc: "Your can becomes blessed by the spherical cow.",               price: 25000 },
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
    <div className="flex flex-col gap-6 mt-8">
      {COSMETICS.map(item => {
        const owned = cosmeticOwned[item.id] ?? false;

        return (
          <div key={item.id} className={`rounded-2xl border p-6 transition-all ${owned ? "border-[#b55334] bg-[#b55334]/5" : "border-[#d4a792] bg-white/40"}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif text-[#b55334]">{item.name}</h3>
                <p className="text-[#8d5d46] mt-1">{item.desc}</p>
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