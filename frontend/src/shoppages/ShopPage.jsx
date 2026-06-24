import { useState } from "react"
import back from '../assets/back.png'
import threechips from '../assets/threechips.png'
import SpecialUpgrades from "./SpecialUpgrades"
import ClickUpgrades from "./ClickUpgrades"
import CosmeticUpgrades from "./CosmeticUpgrades"
import {SHOP_CATEGORIES } from "../lib/shopConstants"

export default function ShopPage({
    onBack,
    count, setCount,
    clickPower,
    clickLevels, setClickLevels,
    animalLevels, setAnimalLevels,
    cosmeticOwned, setCosmeticOwned,
    equippedCosmetic,
    setEquippedCosmetic,
}) {
  const [activeCategory, setActiveCategory] = useState("Pop!"); // default tab
  return (
    <div className="page-base">
      <div className="main-card max-w-5xl">
        {/* Header, wrapper for the whole tab */}
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
        {/* Category Tab*/}
        <div className="flex justify-center gap-5 mt-5">
          {SHOP_CATEGORIES.map((category) => ( // building the row of buttons 
            <button
              key={category.name}
              type="button"
              onClick={() => setActiveCategory(category.name)}
              className={`tab-btn ${activeCategory === category.name ? "tab-btn-active" : "tab-btn-inactive"}`}
            >
              <img src={category.img} alt={category.name} className="w-7 object-contain" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 mt-8 overflow-x-auto">
          {activeCategory === "Pop!" && ( // if active = Pop!
            <ClickUpgrades
                count={count}
                setCount={setCount}
                clickLevels={clickLevels}
                setClickLevels={setClickLevels}
            />
          )}
          {activeCategory === "Specials" && ( // if active = Specials
            <SpecialUpgrades
                count={count}
                setCount={setCount}
                animalLevels={animalLevels}
                setAnimalLevels={setAnimalLevels}
            />
          )}
          {activeCategory === "Cosmetics" && ( // if active = Cosmetics
            <CosmeticUpgrades
                count={count}
                setCount={setCount}
                cosmeticOwned={cosmeticOwned}
                setCosmeticOwned={setCosmeticOwned}
                equippedCosmetic={equippedCosmetic}
                setEquippedCosmetic={setEquippedCosmetic}
            />
          )}
        </div>

        {/* Bottom Stats */}
        <div className="stats-bar flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={threechips} alt="3 chips stacked" className="w-10 h-auto" />
            <span className="counter-shop">{count}</span>
          </div>
          <div className="text-xl font-serif">Chip Value: {clickPower}</div>
        </div>
      </div>
    </div>
  );
}
