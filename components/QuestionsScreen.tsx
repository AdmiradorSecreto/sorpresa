"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useGame } from "@/contexts/GameContext"
import { Home, Lightbulb, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { useMemo, useEffect, useState } from "react"

export function QuestionsScreen() {
  const { state, dispatch, getCurrentLevel, getCurrentQuestion, getProgress } = useGame()
  const currentLevel = getCurrentLevel()
  const currentQuestion = getCurrentQuestion()
  const [showResult, setShowResult] = useState(false)

  // Calculate contrast for text colors
  const textColors = useMemo(() => {
    if (!currentLevel) return { primary: "text-foreground", secondary: "text-muted-foreground" }

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : null
    }

    const rgb = hexToRgb(currentLevel.themeColor)
    if (!rgb) return { primary: "text-foreground", secondary: "text-muted-foreground" }

    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

    return luminance > 0.5
      ? { primary: "text-gray-900", secondary: "text-gray-700" }
      : { primary: "text-white", secondary: "text-gray-200" }
  }, [currentLevel])

  // Handle answer submission
  const handleAnswerSelect = (answer: string) => {
    if (state.isAnswerCorrect !== null) return // Prevent multiple selections

    dispatch({ type: "SELECT_ANSWER", payload: answer })
    dispatch({ type: "SUBMIT_ANSWER" })
    setShowResult(true)
  }

  // Handle next question/level
  const handleNext = () => {
    setShowResult(false)
    dispatch({ type: "NEXT_QUESTION" })
  }

  // Handle hint display
  const handleShowHint = () => {
    dispatch({ type: "SHOW_HINT" })
  }

  // Handle try again
  const handleTryAgain = () => {
    setShowResult(false)
    dispatch({ type: "RESET_QUESTION" })
  }

  // Handle go home
  const handleGoHome = () => {
    dispatch({ type: "RESET_GAME" })
  }

  // Auto-advance on correct answer
  useEffect(() => {
    if (state.isAnswerCorrect === true && showResult) {
      const timer = setTimeout(() => {
        handleNext()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state.isAnswerCorrect, showResult])

  if (!currentLevel || !currentQuestion) {
    return null
  }

  const progress = getProgress()
  const questionProgress = ((state.currentQuestion + 1) / currentLevel.questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, ${currentLevel.themeColor}15 0%, ${currentLevel.themeColor}25 50%, ${currentLevel.themeColor}15 100%),
            radial-gradient(circle at 25% 75%, ${currentLevel.themeColor}10 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, ${currentLevel.themeColor}08 0%, transparent 50%)
          `,
        }}
      />

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentLevel.themeColor }} />
              <span className={`text-sm font-medium ${textColors.secondary}`}>{currentLevel.title}</span>
            </div>
            <div className={`text-sm ${textColors.secondary}`}>
              Pregunta {state.currentQuestion + 1} de {currentLevel.questions.length}
            </div>
          </div>

          <Button
            onClick={handleGoHome}
            variant="ghost"
            size="sm"
            className={`${textColors.secondary} hover:bg-black/10`}
          >
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Button>
        </div>

        {/* Question progress bar */}
        <div className="mt-4 animate-fade-in delay-300">
          <div className="relative">
            <Progress value={questionProgress} className="h-2 bg-black/10" />
            <div
              className="absolute inset-0 h-2 rounded-full transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, ${currentLevel.themeColor} 0%, ${currentLevel.themeColor}80 100%)`,
                width: `${questionProgress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          {/* Question */}
          <div className="text-center mb-12 animate-slide-up">
            <h2 className={`text-2xl md:text-3xl font-bold ${textColors.primary} mb-6 leading-relaxed`}>
              {currentQuestion.text}
            </h2>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-scale-in delay-300">
            {currentQuestion.options.map((option: string, index: number) => {
              const isSelected = state.selectedAnswer === option
              const isCorrect = state.isAnswerCorrect === true && isSelected
              const isIncorrect = state.isAnswerCorrect === false && isSelected
              const isDisabled = state.isAnswerCorrect !== null

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isDisabled}
                  className={`
                    group relative overflow-hidden
                    p-6 h-auto text-left justify-start
                    transition-all duration-300
                    border-2 text-wrap
                    ${
                      isCorrect
                        ? "bg-green-500 border-green-400 text-white shadow-green-500/30"
                        : isIncorrect
                          ? "bg-red-500 border-red-400 text-white shadow-red-500/30"
                          : isSelected
                            ? `border-2 text-white shadow-lg`
                            : `bg-white/90 hover:bg-white border-gray-200 hover:border-gray-300 ${textColors.primary} hover:shadow-lg`
                    }
                    ${isSelected && !showResult ? "animate-pulse" : ""}
                  `}
                  style={
                    isSelected && !showResult
                      ? {
                          backgroundColor: currentLevel.themeColor,
                          borderColor: currentLevel.themeColor,
                          boxShadow: `0 8px 25px ${currentLevel.themeColor}40`,
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${
                          isCorrect
                            ? "bg-green-600"
                            : isIncorrect
                              ? "bg-red-600"
                              : isSelected
                                ? "bg-white/20"
                                : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isIncorrect ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="flex-1 text-base font-medium">{option}</span>
                  </div>

                  {!showResult && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  )}
                </Button>
              )
            })}
          </div>

          {/* Result actions */}
          {showResult && (
            <div className="text-center animate-fade-in">
              {state.isAnswerCorrect === true ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">¡Correcto!</span>
                  </div>
                  <p className={`${textColors.secondary}`}>Avanzando a la siguiente pregunta...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <XCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">Respuesta incorrecta</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      onClick={handleShowHint}
                      variant="outline"
                      className={`${textColors.primary} border-2`}
                      style={{ borderColor: currentLevel.themeColor + "60" }}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Ver Pista
                    </Button>

                    <Button
                      onClick={handleTryAgain}
                      className="text-white"
                      style={{
                        backgroundColor: currentLevel.themeColor,
                        boxShadow: `0 4px 15px ${currentLevel.themeColor}40`,
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Intentar de Nuevo
                    </Button>
                  </div>

                  {/* Hint display */}
                  {state.showHint && (
                    <div
                      className="p-4 rounded-lg border-l-4 animate-slide-up"
                      style={{
                        backgroundColor: currentLevel.themeColor + "10",
                        borderLeftColor: currentLevel.themeColor,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 mt-0.5" style={{ color: currentLevel.themeColor }} />
                        <div>
                          <h4 className={`font-semibold ${textColors.primary} mb-1`}>Pista:</h4>
                          <p className={`${textColors.secondary}`}>{currentQuestion.hint}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Global progress bar */}
      <div className="relative z-10 p-6">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${textColors.secondary}`}>Progreso Global</span>
            <span className={`text-sm font-bold ${textColors.primary}`}>{progress}%</span>
          </div>

          <div className="relative">
            <Progress value={progress} className="h-2 bg-black/10" />
            <div
              className="absolute inset-0 h-2 rounded-full transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, ${currentLevel.themeColor} 0%, ${currentLevel.themeColor}80 100%)`,
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
