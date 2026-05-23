import back from './assets/back.png'
export default function ShopPage({ onBack, count, setCount, clickPower, setClickPower }) {
    const upgrades = [
    { id: 1, name: "Auto-Popper v1", desc: "Automatically pops 1 can every second.", price: "50 chips" , clickMultiplier: 1},
    { id: 2, name: "Golden Fizz", desc: "Doubles the value of every manual pop.", price: "150 chips" , clickMultiplier: 2},
    { id: 3, name: "Mega Factory", desc: "Supercharges all automatic poppers by 5x.", price: "500 chips" , clickMultiplier: 5},
  ];

  function buyUpgrade(item) {
    const cost = parseInt(item.price);
    if (count >= cost) {
        setCount(count - cost);
        setClickPower(c => c + item.clickMultiplier);
        alert("Upgrade purchased!");
    }
    else {
        alert("Not enough chips!");
    }
  }
  return(
    <div className="min-h-screen px-6 py-6 text-[var(--text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 rounded-[2rem] border border-[var(--border)] bg-[rgba(238,230,216,0.72)] p-8 shadow-[var(--shadow)] backdrop-blur-sm relative">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full border-b border-[var(--border)] pb-4">
          <h1 className="text-3xl font-bold tracking-wide">Shop.</h1>
          
          <button
            type="button"
            onClick={onBack}
            className="p-1 bg-transparent border-0 focus:outline-none rounded-full transition-transform hover:scale-105"
            aria-label="Go back"
          >
            <img src={back} alt="back" className="w-12 h-auto" />
          </button>
        </div>

        {/* The Shop Upgrades Table Container */}
        <div className="flex-1 overflow-x-auto w-full mt-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] text-sm font-semibold opacity-70">
                <th className="pb-4 w-2/3">Upgrade Description</th>
                <th className="pb-4 w-1/3 text-right">Cost & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/30">
              {upgrades.map((item) => (
                <tr key={item.id} className="group hover:bg-white/20 transition-colors">
                  {/* Left: Upgrade Details */}
                  <td className="py-6 pr-4">
                    <h3 className="font-bold text-lg text-orange-900">{item.name}</h3>
                    <p className="text-sm opacity-80 mt-1">{item.desc}</p>
                  </td>
                  
                  {/* Right: Price & Button */}
                  <td className="py-6 text-right">
                    <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-3">
                      <span className="font-mono font-bold text-orange-950 bg-orange-200/60 px-3 py-1 rounded-md text-sm">
                        {item.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => buyUpgrade(item)} // Placeholder for purchase logic
                        className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        Upgrade
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div> 
  )
}