import { useState } from "react"
import back from '../assets/back.png'
import SpecialUpgrades from "./SpecialUpgrades"
import ClickUpgrades from "./ClickUpgrades"
import CosmeticUpgrades from "./CosmeticUpgrades"

export default function ShopPage({
  onBack,
  count, setCount,
  clickPower, setClickPower,
  clickLevels, setClickLevels,
  animalLevels, setAnimalLevels,
  cosmeticOwned, setCosmeticOwned,
}) {
  const [activeCategory, setActiveCategory] = useState("click");
  const categories = ["click", "special", "cosmetic"];

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

        {/* Tab Content */}
        <div className="flex-1 mt-8 overflow-x-auto">
          {activeCategory === "click" && (
            <ClickUpgrades
              count={count}
              setCount={setCount}
              clickLevels={clickLevels}
              setClickLevels={setClickLevels}
              setClickPower={setClickPower}
            />
          )}
          {activeCategory === "special" && (
            <SpecialUpgrades
              count={count}
              setCount={setCount}
              animalLevels={animalLevels}
              setAnimalLevels={setAnimalLevels}
            />
          )}
          {activeCategory === "cosmetic" && (
            <CosmeticUpgrades
              count={count}
              setCount={setCount}
              cosmeticOwned={cosmeticOwned}
              setCosmeticOwned={setCosmeticOwned}
            />
          )}
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
