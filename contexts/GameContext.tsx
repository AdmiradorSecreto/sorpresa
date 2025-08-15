"use client";

import type React from "react";
import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { GameState, Level } from "@/lib/types";
import levelsData from "@/data/levelsData.json";

interface GameContextType {
  state: GameState;
  levels: Level[];
  dispatch: React.Dispatch<GameAction>;
  getCurrentLevel: () => Level | null;
  getCurrentQuestion: () => any;
  getTotalQuestions: () => number;
  getProgress: () => number;
}

type GameAction =
  | { type: "START_GAME" }
  | { type: "START_LEVEL" }
  | { type: "NEXT_LEVEL" }
  | { type: "NEXT_QUESTION" }
  | { type: "SELECT_ANSWER"; payload: string }
  | { type: "SUBMIT_ANSWER" }
  | { type: "SHOW_HINT" }
  | { type: "RESET_QUESTION" }
  | { type: "COMPLETE_GAME" }
  | { type: "RESET_GAME" };

const initialState: GameState = {
  currentLevel: 0,
  currentQuestion: 0,
  completedLevels: [],
  isGameComplete: false,
  showHint: false,
  selectedAnswer: null,
  isAnswerCorrect: null,
  activeScreen: "welcome", // start at welcome
};

function gameReducer(state: GameState, action: GameAction): GameState {
  const levels = levelsData as Level[];

  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        currentLevel: 0,
        currentQuestion: 0,
        activeScreen: "level-intro", // pasa a intro nivel
      };

    case "START_LEVEL":
      return {
        ...state,
        currentQuestion: 0,
        selectedAnswer: null,
        isAnswerCorrect: null,
        showHint: false,
        activeScreen: "questions", // empieza el nivel
      };

    case "NEXT_QUESTION":
      const currentLevel = levels[state.currentLevel];
      const nextQuestion = state.currentQuestion + 1;

      if (nextQuestion >= currentLevel.questions.length) {
        // fin de nivel → siguiente nivel
        return gameReducer(state, { type: "NEXT_LEVEL" });
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        selectedAnswer: null,
        isAnswerCorrect: null,
        showHint: false,
      };

    case "NEXT_LEVEL":
      const nextLevelIndex = state.currentLevel + 1;

      if (nextLevelIndex >= levels.length) {
        return {
          ...state,
          completedLevels: [...state.completedLevels, state.currentLevel],
          isGameComplete: true,
          activeScreen: "final", // juego completado
        };
      }

      return {
        ...state,
        currentLevel: nextLevelIndex,
        currentQuestion: 0,
        completedLevels: [...state.completedLevels, state.currentLevel],
        selectedAnswer: null,
        isAnswerCorrect: null,
        showHint: false,
        activeScreen: "level-intro", // siguiente intro nivel
      };

    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswer: action.payload,
        isAnswerCorrect: null,
      };

    case "SUBMIT_ANSWER":
      const level = levels[state.currentLevel];
      const question = level.questions[state.currentQuestion];
      return {
        ...state,
        isAnswerCorrect: state.selectedAnswer === question.answer,
      };

    case "SHOW_HINT":
      return { ...state, showHint: true };

    case "RESET_QUESTION":
      return {
        ...state,
        selectedAnswer: null,
        isAnswerCorrect: null,
        showHint: false,
      };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const levels = levelsData as Level[];

  const getCurrentLevel = () => {
    return levels[state.currentLevel] || null;
  };

  const getCurrentQuestion = () => {
    const level = getCurrentLevel();
    return level?.questions[state.currentQuestion] || null;
  };

  const getTotalQuestions = () => {
    return levels.reduce((total, level) => total + level.questions.length, 0);
  };

  const getProgress = () => {
    const totalQuestions = getTotalQuestions();
    const completedQuestions =
      state.completedLevels.reduce((total, levelIndex) => {
        return total + levels[levelIndex]?.questions.length || 0;
      }, 0) + state.currentQuestion;

    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        levels,
        dispatch,
        getCurrentLevel,
        getCurrentQuestion,
        getTotalQuestions,
        getProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
