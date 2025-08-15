"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { GameState } from "../types/game"

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

type GameAction =
  | { type: "START_GAME" }
  | { type: "START_LEVEL" }
  | { type: "NEXT_QUESTION" }
  | { type: "NEXT_LEVEL" }
  | { type: "SHOW_HINT" }
  | { type: "HIDE_HINT" }
  | { type: "COMPLETE_GAME" }
  | { type: "RESET_GAME" }

const initialState: GameState = {
  currentLevel: 1,
  currentQuestion: 0,
  totalLevels: 6,
  isGameComplete: false,
  showHint: false,
  gamePhase: "welcome",
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gamePhase: "level-intro" }
    case "START_LEVEL":
      return { ...state, gamePhase: "game", showHint: false }
    case "NEXT_QUESTION":
      return { ...state, currentQuestion: state.currentQuestion + 1, showHint: false }
    case "NEXT_LEVEL":
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
        currentQuestion: 0,
        gamePhase: "level-intro",
        showHint: false,
      }
    case "SHOW_HINT":
      return { ...state, showHint: true }
    case "HIDE_HINT":
      return { ...state, showHint: false }
    case "COMPLETE_GAME":
      return { ...state, gamePhase: "final", isGameComplete: true }
    case "RESET_GAME":
      return { ...initialState }
    default:
      return state
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
