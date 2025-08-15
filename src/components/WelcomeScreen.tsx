"use client"
import { useGame } from "../context/GameContext"
import { Play } from "lucide-react"

export function WelcomeScreen() {
  const { dispatch } = useGame()

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #390007 0%, #5a0009 100%)" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-yellow-400 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-yellow-400 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-yellow-400 animate-pulse delay-2000"></div>
      </div>

      <div className="text-center z-10 animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-4 animate-slide-down">Escape Room</h1>
        <p className="text-xl text-gray-200 mb-12 animate-slide-up">
          Una experiencia inmersiva de preguntas y desafíos
        </p>

        <button
          onClick={() => dispatch({ type: "START_GAME" })}
          className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold text-xl rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/25 animate-bounce-subtle"
        >
          <div className="flex items-center gap-3">
            <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            Comenzar
          </div>
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  )
}
