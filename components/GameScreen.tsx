"use client"

import { useGame } from "@/contexts/GameContext"
import { WelcomeScreen } from "./WelcomeScreen"
import { LevelIntroScreen } from "./LevelIntroScreen"
import { QuestionsScreen } from "./QuestionsScreen"
import { FinalScreen } from "./FinalScreen"
import { useState, useEffect } from "react"

export function GameScreen() {
  const { state, getCurrentLevel } = useGame()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<string>("welcome")

  const getNextScreen = (): string => {
    if (state.isGameComplete) {
      return "final"
    }

    if (state.currentLevel === 0 && state.currentQuestion === 0 && state.completedLevels.length === 0) {
      return "welcome"
    }

    const currentLevel = getCurrentLevel()
    if (!currentLevel) {
      return "final"
    }

    if (state.selectedAnswer !== null || state.currentQuestion > 0) {
      return "questions"
    }

    return "level-intro"
  }

  const nextScreen = getNextScreen()

  // Handle screen transitions with animation
  useEffect(() => {
    if (nextScreen !== currentScreen) {
      setIsTransitioning(true)

      const timer = setTimeout(() => {
        setCurrentScreen(nextScreen)
        setIsTransitioning(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [nextScreen, currentScreen])

  // Render current screen with transition effects
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen />
      case "level-intro":
        return <LevelIntroScreen />
      case "questions":
        return <QuestionsScreen />
      case "final":
        return <FinalScreen />
      default:
        return <WelcomeScreen />
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Screen transition overlay */}
      <div
        className={`
          absolute inset-0 bg-black z-50 transition-opacity duration-300 pointer-events-none
          ${isTransitioning ? "opacity-30" : "opacity-0"}
        `}
      />

      {/* Main screen content with transition effects */}
      <div
        className={`
          transition-all duration-300 ease-out
          ${isTransitioning ? "scale-95 opacity-70 blur-sm" : "scale-100 opacity-100 blur-0"}
        `}
      >
        {renderScreen()}
      </div>
    </div>
  )
}
