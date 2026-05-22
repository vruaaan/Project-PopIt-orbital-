import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

export default function App() { // creating a react component (reusable UI block)
  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center">
      
      <h1 className="text-6xl font-bold mb-6">
        PopIt!
      </h1>

        <button
          type="button"
          aria-label="Play PopIt"
          onClick={() => console.log('Play clicked')}
          className="mt-8 p-0 bg-transparent border-0 focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-full"
        >
          <img src="/plain can.png" alt="PopIt Can" className="w-10 hover:scale-105 transition-transform" sizes="10" />
        </button>

    </div> 
  )
}