import { useState } from "react"
import back from '../assets/back.png'
import threechips from '../assets/threechips.png'
import star from '../assets/star.png'
import can from '../assets/plain can.png'
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
  profile
}) {
  const [activeCategory, setActiveCategory] = useState("Pop!"); // default tab
  const categories = ["Pop!", "Specials", "Cosmetics"]; // initialising array of the 3 categories
  const cat_img = [threechips, star, can]
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
          {categories.map((cat, index) => ( // building the row of buttions 
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`tab-btn ${activeCategory === cat ? "tab-btn-active" : "tab-btn-inactive"}`}
            >
              <img src={cat_img[index]} alt={cat} className="w-7 object-contain" />
              {cat}
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
              setClickPower={setClickPower}
              profile = {profile}
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
