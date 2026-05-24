import back from './assets/back.png'
export default function ShopPage({ onBack, count, setCount, clickPower, setClickPower }) {
    const upgrades = [
    { id: 1, name: "Auto-Popper v1", desc: "Automatically pops 1 can every second.", price: "50 chips" , clickMultiplier: 1},
    { id: 2, name: "Golden Fizz", desc: "Doubles the value of every manual pop.", price: "150 chips" , clickMultiplier: 2},
    { id: 3, name: "Mega Factory", desc: "Supercharges all automatic poppers by 5x.", price: "500 chips" , clickMultiplier: 5},
  ];
  return (
    <div className="page-base">

      {/* Main Container */}
        <div className="main-card max-w-5xl">
        {/* Header */}
        <div className="flex items-start justify-between w-full">
          {/* Page Title */}
          <h1 className="title-huge">
            Shop.
          </h1>
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="bg-transparent border-0 transition-transform hover:scale-105"
            aria-label="Go back">
            <img src={back} alt="back" className="back-img"/>
          </button>
        </div>
        {/* Shop Table */}
        <div className="flex-1 mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Headers */}
            <thead>
              <tr className="table-headers">
                <th className="pb-6 text-left"> Description</th>
                <th className="pb-6 text-right">Cost & Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {upgrades.map((item) => (
                <tr key={item.id} className="row-hover">
                  {/* Left Side */}
                  <td className="py-8 pr-8">
                    <h3 className="text-3xl font-serif text-[#b55334] drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-lg text-[#8d5d46]">
                      {item.desc}
                    </p>
                  </td>
                  {/* Right Side */}
                  <td className="py-8">
                    <div className="flex flex-col items-end gap-4">
                      {/* Price */}
                      <span className="pill">
                        {item.price}
                      </span>
                      {/* Upgrade Button */}
                      <button type="button"
                        onClick={() => buyUpgrade(item)}
                        className="btn-upgrade px-8 py-3">
                        Upgrade
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Bottom Stats */}
        <div className="stats-bar">
          <div className="text-xl font-serif">
            Chips: {count}
          </div>
          <div className="text-xl font-serif">
            Click Power: {clickPower}
          </div>
        </div>
      </div>
    </div>
  )
}