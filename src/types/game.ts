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
  totalLevels: number
  isGameComplete: boolean
  showHint: boolean
  gamePhase: "welcome" | "level-intro" | "game" | "final"
}
