"use client"

import { useState, useEffect } from "react"
import { useGame } from "../context/GameContext"
import { Home, Trophy, Star, Sparkles } from "lucide-react"

export function FinalScreen() {
  const { dispatch } = useGame()
  const [chestOpen, setChestOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setChestOpen(true)
      // Mostrar contenido después de que el cofre se abra
      setTimeout(() => setShowContent(true), 800)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #1a0003 0%, #390007 25%, #5a0009 50%, #390007 75%, #1a0003 100%)" 
      }}
    >
      {/* Enhanced animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              i % 3 === 0 
                ? 'w-1 h-1 bg-yellow-300' 
                : i % 3 === 1 
                ? 'w-2 h-2 bg-yellow-400' 
                : 'w-1.5 h-1.5 bg-yellow-200'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          ></div>
        ))}
      </div>

      {/* Elegant home button */}
      <button
        onClick={() => dispatch({ type: "RESET_GAME" })}
        className="absolute top-8 left-8 p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-500 group text-white shadow-2xl"
      >
        <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Main content container */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        {/* Title with enhanced animation */}
        <div className="mb-16 animate-slide-down">
          <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 mb-4 tracking-tight">
            ¡Felicidades!
          </h1>
          <div className="flex justify-center items-center gap-2 opacity-80">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            <p className="text-xl text-gray-300 font-light">Misión Completada</p>
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Enhanced Treasure Chest */}
        <div className="flex justify-center mb-16">
          <div className="relative animate-bounce-subtle">
            <div className={`treasure-chest ${chestOpen ? "open" : ""}`}>
              {/* Chest glow effect */}
              <div className="absolute -inset-8 bg-gradient-radial from-yellow-400/30 via-yellow-600/20 to-transparent rounded-full blur-xl"></div>
              
              {/* Chest Base - Enhanced */}
              <div className="chest-base relative w-40 h-24 bg-gradient-to-b from-yellow-500 via-yellow-600 to-yellow-800 rounded-2xl border-4 border-yellow-900 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-200 rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-200 rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-yellow-800 rounded-sm"></div>
                
                {/* Chest Lid - Enhanced */}
                <div
                  className={`chest-lid absolute -top-5 left-0 w-full h-20 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl border-4 border-yellow-900 transition-all duration-1500 origin-bottom shadow-xl ${
                    chestOpen ? "-rotate-45 -translate-y-6 shadow-2xl" : ""
                  }`}
                >
                  {/* Lid decorations */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-md shadow-inner"></div>
                  <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-200 rounded-full"></div>
                  <div className="absolute top-2 right-4 w-1 h-1 bg-yellow-200 rounded-full"></div>
                </div>

                {/* Enhanced treasure inside */}
                {chestOpen && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-fade-in">
                    <div className="relative">
                      {/* Trophy with glow */}
                      <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-60 rounded-full"></div>
                      <Trophy className="relative w-16 h-16 text-yellow-300 animate-pulse drop-shadow-2xl" />
                      
                      {/* Sparkles around trophy */}
                      <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-yellow-200 animate-ping" />
                      <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-200 animate-ping" style={{ animationDelay: '0.5s' }} />
                      <Sparkles className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-yellow-200 animate-ping" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>
                )}

                {/* Enhanced golden glow */}
                {chestOpen && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-yellow-400/40 to-yellow-200/20 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content that appears after chest opens */}
        {showContent && (
          <div className="animate-slide-up">
            <div className="mb-12">
              <p className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto font-light">
                Has completado todos los niveles del Escape Room con éxito. Tu conocimiento y perseverancia te han llevado hasta aquí.
              </p>
            </div>

            {/* Enhanced message card */}
            <div className="relative mb-12 max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full">
                    <Trophy className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 mb-4">
                  Mensaje Final
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed font-light">
                  "El verdadero tesoro no está en el cofre, sino en el maletero de mi coche."
                </p>
              </div>
            </div>

            {/* Enhanced action button */}
            <button
              onClick={() => dispatch({ type: "RESET_GAME" })}
              className="group relative px-12 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-gray-900 font-semibold text-xl rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/40 hover:from-yellow-300 hover:to-yellow-400 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-4">
                <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Jugar de Nuevo</span>
              </div>
            </button>
          </div>
        )}
      </div>


    </div>
  )
}