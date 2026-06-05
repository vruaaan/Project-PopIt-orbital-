import { useState } from "react";
import back from './assets/back.png'

export default function ShopPage({ onBack, count, setCount, clickPower, setClickPower }) {
  const [activeCategory, setActiveCategory] = useState("click");

  const allUpgrades = [
    { id: 1, name: "Auto-Popper v1",  desc: "Automatically pops 1 can every second.",        price: 50,  clickMultiplier: 1, category: "click"    },
    { id: 2, name: "Golden Fizz",     desc: "Doubles the value of every manual pop.",         price: 150, clickMultiplier: 2, category: "click"    },
    { id: 3, name: "Mega Factory",    desc: "Supercharges all automatic poppers by 5x.",      price: 500, clickMultiplier: 5, category: "click"    },
    { id: 4, name: "Seal",    desc: "5% chance to triple chips on each pop.",         price: 200, clickMultiplier: 0, category: "special"  },
    { id: 5, name: "Cow",      desc: "Unleashes a burst of 10 pops instantly.",        price: 350, clickMultiplier: 0, category: "special"  },
    { id: 6, name: "Seal Can",     desc: "Your can becomes covered in a thick layer of seal blubber.",           price: 100, clickMultiplier: 0, category: "cosmetic" },
    { id: 7, name: "Cow Can",     desc: "Your can becomes blessed by the spherical cow.",        price: 250, clickMultiplier: 0, category: "cosmetic" },
  ];

  const categories = ["click", "special", "cosmetic"];
  const upgrades = allUpgrades.filter(u => u.category === activeCategory);

  function buyUpgrade(upgrade) {
    if (count >= upgrade.price) {
      setCount(count - upgrade.price);
      setClickPower(clickPower + upgrade.clickMultiplier);
    } else {
      alert("Not enough chips to buy this upgrade!");
    }
  }

  return (
    <div className="page-base">
      <div className="main-card max-w-5xl">

        {/* Header */}
        <div className="flex items-start justify-between w-full">
          <h1 className="title-huge">Shop.</h1>
          <button
            type="button"
            onClick={onBack}
            className="bg-transparent border-0 transition-transform hover:scale-105"
            aria-label="Go back">
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mt-8">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-serif text-lg capitalize transition-all
                ${activeCategory === cat
                  ? "bg-[#b55334] text-white shadow-sm"
                  : "bg-transparent border border-[#b55334] text-[#b55334] hover:bg-[#b55334]/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Shop Table */}
        <div className="flex-1 mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="table-headers">
                <th className="pb-6 text-left">Description</th>
                <th className="pb-6 text-right">Cost & Action</th>
              </tr>
            </thead>
            <tbody>
              {upgrades.map((item) => (
                <tr key={item.id} className="row-hover">
                  <td className="py-8 pr-8">
                    <h3 className="text-3xl font-serif text-[#b55334] drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-lg text-[#8d5d46]">{item.desc}</p>
                  </td>
                  <td className="py-8">
                    <div className="flex flex-col items-end gap-4">
                      <span className="pill">{item.price} chips</span>
                      <button
                        type="button"
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
          <div className="text-xl font-serif">Chips: {count}</div>
          <div className="text-xl font-serif">Click Power: {clickPower}</div>
        </div>

      </div>
    </div>
  );
}