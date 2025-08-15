"use client"

import { useState, useEffect } from "react"
import { useGame } from "../context/GameContext"
import { Home, Trophy } from "lucide-react"

export function FinalScreen() {
  const { dispatch } = useGame()
  const [chestOpen, setChestOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setChestOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #390007 0%, #5a0009 100%)" }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Home button */}
      <button
        onClick={() => dispatch({ type: "RESET_GAME" })}
        className="absolute top-6 left-6 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 group text-white"
      >
        <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      <div className="text-center z-10 animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-8 animate-slide-down">¡Felicidades!</h1>

        {/* Treasure Chest Animation */}
        <div className="relative mb-12 animate-bounce-subtle">
          <div className={`treasure-chest ${chestOpen ? "open" : ""} mx-auto`}>
            {/* Chest Base */}
            <div className="chest-base w-32 h-20 bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-lg border-4 border-yellow-800 relative">
              {/* Chest Lid */}
              <div
                className={`chest-lid absolute -top-4 left-0 w-full h-16 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-t-lg border-4 border-yellow-800 transition-transform duration-1000 origin-bottom ${chestOpen ? "-rotate-45 -translate-y-4" : ""}`}
              >
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-yellow-800 rounded"></div>
              </div>

              {/* Treasure inside */}
              {chestOpen && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-fade-in">
                  <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
                </div>
              )}

              {/* Golden glow */}
              {chestOpen && <div className="absolute inset-0 rounded-lg bg-yellow-400 opacity-30 animate-pulse"></div>}
            </div>
          </div>
        </div>

        {chestOpen && (
          <div className="animate-slide-up">
            <p className="text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              Has completado todos los niveles del Escape Room con éxito. Tu conocimiento y perseverancia te han llevado
              hasta aquí.
            </p>

            <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Mensaje Final</h3>
              <p className="text-gray-200">
                "El verdadero tesoro no está en el cofre, sino en el maletero de mi coche."
              </p>
            </div>

            <button
              onClick={() => dispatch({ type: "RESET_GAME" })}
              className="group relative px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/25"
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Jugar de Nuevo
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
