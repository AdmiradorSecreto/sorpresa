"use client";

import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { Play, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export function WelcomeScreen() {
  const { dispatch } = useGame();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);

    // Add a slight delay for the starting animation
    setTimeout(() => {
      dispatch({ type: "START_GAME" });
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced background with wine red gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, #390007, #4a0009, #2d0005),
            radial-gradient(circle at 20% 80%, rgba(215, 196, 158, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(215, 196, 158, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(215, 196, 158, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-500" />
        <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-accent rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-accent rounded-full animate-pulse delay-1200" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/6 right-1/6 w-8 h-8 border bg-accent border-accent rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-1/6 left-1/6 w-6 h-6 border bg-accent border-accent rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        {/* Enhanced title with entrance animation */}
        <div className="animate-fade-in">
          <div className="mb-6 animate-slide-up">
            <h1 className="luxury-title text-white mb-4">
              Escape Room
              <span className="block text-accent font-black tracking-wider relative">
                LOREA
                <div className="absolute -inset-2 bg-accent/10 blur-xl rounded-full animate-pulse" />
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8 animate-slide-up delay-300">
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            <p className="luxury-subtitle text-white/90 max-w-2xl leading-relaxed">
              Resuelve enigmas,
              supera desafíos y demuestra tu ingenio para saber donde están los regalos.
            </p>
            <Sparkles className="w-6 h-6 text-accent animate-pulse delay-500" />
          </div>
        </div>

        {/* Enhanced start button with more sophisticated animations */}
        <div className="animate-scale-in delay-700">
          <Button
            onClick={handleStart}
            disabled={isStarting}
            size="lg"
            className={`
              group relative overflow-hidden
              bg-accent hover:bg-accent/90 
              text-accent-foreground font-bold
              px-12 py-6 text-xl
              border-2 border-accent/20
              shadow-2xl shadow-accent/20
              transition-all duration-500
              hover:scale-110 hover:shadow-accent/40
              disabled:opacity-70 disabled:cursor-not-allowed
              ${
                isStarting
                  ? "animate-pulse scale-105"
                  : "animate-pulse hover:animate-none"
              }
            `}
          >
            {/* Enhanced shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

            <div className="relative flex items-center gap-3">
              {isStarting ? (
                <>
                  <Zap className="w-6 h-6 animate-spin" />
                  <span className="tracking-wide">INICIANDO...</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="tracking-wide">COMENZAR</span>
                </>
              )}
            </div>
          </Button>
        </div>

        {/* Enhanced decorative elements */}
        <div className="mt-16 flex justify-center items-center gap-8 opacity-60 animate-fade-in delay-1000">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
          <div className="text-accent text-sm font-medium tracking-widest relative">
            DESAFÍO MENTAL
            <div className="absolute -bottom-1 left-0 right-0 h-px bg-accent/30 animate-pulse delay-500" />
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse delay-300" />
        </div>
      </div>

      {/* Enhanced bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 animate-pulse" />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
