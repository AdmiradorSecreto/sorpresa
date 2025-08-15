"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGame } from "@/contexts/GameContext";
import { ArrowRight, Home, Trophy } from "lucide-react";
import { useMemo } from "react";

export function LevelIntroScreen() {
  const { state, dispatch, getCurrentLevel, getProgress } = useGame();
  const currentLevel = getCurrentLevel();

  // Calculate contrast and determine if we need light or dark text
  const textColors = useMemo(() => {
    if (!currentLevel)
      return { primary: "text-white", secondary: "text-gray-200" };

    // Convert hex to RGB to calculate luminance
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const rgb = hexToRgb(currentLevel.themeColor);
    if (!rgb) return { primary: "text-white", secondary: "text-gray-200" };

    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

    return luminance > 0.5
      ? { primary: "text-gray-900", secondary: "text-gray-700" } // fondo claro → texto oscuro
      : { primary: "text-white", secondary: "text-gray-200" }; // fondo oscuro → texto claro
  }, [currentLevel]);

  if (!currentLevel) {
    return null;
  }

  const handleStart = () => {
    dispatch({ type: "START_LEVEL" });
  };

  const handleGoHome = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic background with level theme color, darker */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, ${currentLevel.themeColor}80 0%, ${currentLevel.themeColor}70 100%),
            radial-gradient(circle at 30% 70%, ${currentLevel.themeColor}40 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, ${currentLevel.themeColor}30 0%, transparent 50%),
            rgba(0, 0, 0, 0.3) /* Overlay negro para oscurecer más */
          `,
          backgroundBlendMode: "overlay, normal", // mezcla bien la capa negra con los degradados
        }}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/5 w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: currentLevel.themeColor + "30" }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full animate-pulse delay-700"
          style={{ backgroundColor: currentLevel.themeColor + "30" }}
        />
        <div
          className="absolute top-1/2 right-1/5 w-1.5 h-1.5 rounded-full animate-pulse delay-1000"
          style={{ backgroundColor: currentLevel.themeColor + "30" }}
        />
      </div>

      {/* Header with level indicator */}
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: currentLevel.themeColor }}
            />
            <span
              className={`text-sm font-medium tracking-wide ${textColors.secondary}`}
            >
              NIVEL {currentLevel.id}
            </span>
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
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            {/* Level title with theme color accent */}
            <div className="mb-6 animate-slide-up">
              <div
                className="inline-block w-16 h-1 mb-4 rounded-full"
                style={{ backgroundColor: currentLevel.themeColor }}
              />
              <h1 className={`luxury-title ${textColors.primary} mb-2`}>
                {currentLevel.title}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Trophy className={`w-5 h-5 ${textColors.secondary}`} />
                <span
                  className={`text-sm font-medium ${textColors.secondary} tracking-wide`}
                >
                  {currentLevel.questions.length} PREGUNTA
                  {currentLevel.questions.length > 1 ? "S" : ""}
                </span>
              </div>
            </div>

            {/* Level description */}
            <p
              className={`luxury-subtitle ${textColors.secondary} max-w-2xl mx-auto mb-12 animate-slide-up delay-300`}
            >
              {currentLevel.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in delay-700">
            <Button
              onClick={handleStart}
              size="lg"
              className="
                relative flex items-center gap-3 px-10 py-5 font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300
                hover:scale-105 border-2 border-white/20
              "
              style={{
                backgroundColor: "#FFFFFF10", // muy transparente, deja ver fondo
                boxShadow: `0 10px 30px ${currentLevel.themeColor}40`,
              }}
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <span>EMPEZAR NIVEL</span>
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              size="lg"
              className="
                relative flex items-center gap-3 px-10 py-5 font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300
                hover:scale-105 border-2 border-white/20
              "
              style={{
                backgroundColor: "#FFFFFF10", // muy transparente, deja ver fondo
                boxShadow: `0 10px 30px ${currentLevel.themeColor}40`,
              }}
            >
              <Home className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
          </div>

          {/* Level stats */}
          <div className="mt-16 flex justify-center items-center gap-8 animate-fade-in delay-1000">
            <div className="text-center">
              <div className={`text-2xl font-bold ${textColors.primary}`}>
                {currentLevel.questions.length}
              </div>
              <div className={`text-xs ${textColors.secondary} tracking-wide`}>
                PREGUNTAS
              </div>
            </div>

            <div
              className="w-px h-8"
              style={{ backgroundColor: currentLevel.themeColor + "40" }}
            />

            <div className="text-center">
              <div className={`text-2xl font-bold ${textColors.primary}`}>
                {progress}%
              </div>
              <div className={`text-xs ${textColors.secondary} tracking-wide`}>
                PROGRESO
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="relative z-10 p-8">
        <div className="animate-fade-in delay-1200">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${textColors.secondary}`}>
              Progreso Global
            </span>
            <span className={`text-sm font-bold ${textColors.primary}`}>
              {progress}%
            </span>
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

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${currentLevel.themeColor} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}
