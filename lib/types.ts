export interface Question {
  id: number
  text: string
  options: string[]
  answer: string
  hint: string
}

export interface Level {
  id: number
  title: string
  description: string
  themeColor: string
  questions: Question[]
}

export interface GameState {
  currentLevel: number
  currentQuestion: number
  completedLevels: number[]
  isGameComplete: boolean
  showHint: boolean
  selectedAnswer: string | null
  isAnswerCorrect: boolean | null
  activeScreen: GameScreen 
}

export type GameScreen = "welcome" | "level-intro" | "questions" | "final"
