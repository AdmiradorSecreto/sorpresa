"use client";

import type React from "react";
import { useState } from "react";
import { useGame } from "../context/GameContext";
import type { Level } from "../types/game";
import { getContrastColor } from "../utils/colorUtils";
import { Home, Lightbulb, CheckCircle, XCircle } from "lucide-react";

interface GameScreenProps {
  level: Level;
  totalQuestions: number;
  onNextLevel: () => void;
}

export function GameScreen({ level, onNextLevel }: GameScreenProps) {
  const { state, dispatch } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = level.questions[state.currentQuestion];
  const textColor = getContrastColor(level.themeColor);
  const progress =
    ((state.currentLevel - 1) * 100 +
      ((state.currentQuestion + 1) / level.questions.length) * 100) /
    state.totalLevels;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTimeout(() => {
        if (state.currentQuestion + 1 < level.questions.length) {
          dispatch({ type: "NEXT_QUESTION" });
          resetQuestion();
        } else {
          onNextLevel();
        }
      }, 1500);
    }
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
    dispatch({ type: "HIDE_HINT" });
  };

  const tryAgain = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: level.themeColor }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={() => dispatch({ type: "RESET_GAME" })}
          className="p-3 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 group"
          style={{ color: textColor }}
        >
          <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: textColor }}>
            {level.title}
          </h2>
          <p className="text-sm opacity-80" style={{ color: textColor }}>
            Pregunta {state.currentQuestion + 1} de {level.questions.length}
          </p>
        </div>

        <div className="w-12"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="w-full bg-black bg-opacity-20 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-yellow-400 to-yellow-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p
          className="text-center mt-2 text-sm opacity-80"
          style={{ color: textColor }}
        >
          Progreso total: {Math.round(progress)}%
        </p>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h3
            className="text-3xl font-bold mb-8 leading-relaxed"
            style={{ color: textColor }}
          >
            {currentQuestion.text}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {currentQuestion.options.map((option, index) => {
            let buttonClass =
              "p-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2";
            const buttonStyle: React.CSSProperties = {
              color: textColor,
              borderColor: `${textColor}40`,
              backgroundColor:
                textColor === "#ffffff"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
            };

            if (showResult && selectedAnswer === option) {
              if (isCorrect) {
                buttonClass += " animate-pulse";
                buttonStyle.backgroundColor = "#10B981";
                buttonStyle.borderColor = "#10B981";
                buttonStyle.color = "#ffffff";
              } else {
                buttonClass += " animate-shake";
                buttonStyle.backgroundColor = "#EF4444";
                buttonStyle.borderColor = "#EF4444";
                buttonStyle.color = "#ffffff";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={buttonClass}
                style={buttonStyle}
                disabled={showResult}
              >
                <div className="flex items-center justify-center gap-3">
                  {showResult &&
                    selectedAnswer === option &&
                    (isCorrect ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    ))}
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint and Try Again */}
        {showResult && !isCorrect && (
          <div className="flex flex-col items-center animate-fade-in space-y-4">
            {/* Ver Pista / Hint */}
            {!state.showHint ? (
              <button
                onClick={() => dispatch({ type: "SHOW_HINT" })}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor:
                    textColor === "#ffffff"
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.15)",
                  color: textColor,
                  border: `2px solid ${textColor}40`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Ver Pista
                </div>
              </button>
            ) : (
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor:
                    textColor === "#ffffff"
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.15)",
                  color: textColor,
                }}
              >
                <p className="text-lg">{currentQuestion.hint}</p>
              </div>
            )}

            {/* Intentar de Nuevo */}
            <button
              onClick={tryAgain}
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor:
                  textColor === "#ffffff"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                color: textColor,
                border: `2px solid ${textColor}60`,
              }}
            >
              Intentar de Nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
