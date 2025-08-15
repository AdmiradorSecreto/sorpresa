"use client"

import { useState } from "react"
import { GameProvider, useGame } from "./context/GameContext"
import { WelcomeScreen } from "./components/WelcomeScreen"
import { LevelIntroScreen } from "./components/LevelIntroScreen"
import { GameScreen } from "./components/GameScreen"
import { FinalScreen } from "./components/FinalScreen"
import type { Level } from "./types/game"
import levelsData from "../data/levelsData.json"

function GameContent() {
  const { state, dispatch } = useGame()
  const [levels] = useState<Level[]>(levelsData)

  const currentLevel = levels.find((level) => level.id === state.currentLevel)
  const totalQuestions = levels.reduce((sum, level) => sum + level.questions.length, 0)

  const handleNextLevel = () => {
    if (state.currentLevel < state.totalLevels) {
      dispatch({ type: "NEXT_LEVEL" })
    } else {
      dispatch({ type: "COMPLETE_GAME" })
    }
  }

  if (state.gamePhase === "welcome") {
    return <WelcomeScreen />
  }

  if (state.gamePhase === "level-intro" && currentLevel) {
    return <LevelIntroScreen level={currentLevel} />
  }

  if (state.gamePhase === "game" && currentLevel) {
    return <GameScreen level={currentLevel} totalQuestions={totalQuestions} onNextLevel={handleNextLevel} />
  }

  if (state.gamePhase === "final") {
    return <FinalScreen />
  }

  return <WelcomeScreen />
}

function App() {
  return (
    <GameProvider>
      <div className="font-serif">
        <GameContent />
      </div>
    </GameProvider>
  )
}

export default App
