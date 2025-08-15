"use client"
import { useGame } from "../context/GameContext"
import type { Level } from "../types/game"
import { getContrastColor } from "../utils/colorUtils"
import { Play, Home } from "lucide-react"

interface LevelIntroScreenProps {
  level: Level
}

export function LevelIntroScreen({ level }: LevelIntroScreenProps) {
  const { dispatch } = useGame()
  const textColor = getContrastColor(level.themeColor)

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: level.themeColor }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-current animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full border-2 border-current animate-spin-slow delay-1000"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full border-2 border-current animate-spin-slow delay-2000"></div>
      </div>

      {/* Home button */}
      <button
        onClick={() => dispatch({ type: "RESET_GAME" })}
        className="absolute top-6 left-6 p-3 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 group"
        style={{ color: textColor }}
      >
        <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      <div className="text-center z-10 max-w-2xl px-8 animate-fade-in">
        <h1 className="text-5xl font-bold mb-6 animate-slide-down" style={{ color: textColor }}>
          {level.title}
        </h1>

        <p className="text-xl mb-12 leading-relaxed animate-slide-up" style={{ color: textColor, opacity: 0.9 }}>
          {level.description}
        </p>

        <button
          onClick={() => dispatch({ type: "START_LEVEL" })}
          className="group relative px-10 py-4 font-semibold text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: textColor === "#ffffff" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
            color: textColor,
            border: `2px solid ${textColor}40`,
          }}
        >
          <div className="flex items-center gap-3">
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            Empezar Nivel
          </div>
        </button>
      </div>
    </div>
  )
}
