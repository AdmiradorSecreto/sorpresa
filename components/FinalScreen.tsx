"use client"

import { Button } from "@/components/ui/button"
import { useGame } from "@/contexts/GameContext"
import { Trophy, Sparkles, RotateCcw, Crown } from "lucide-react"
import { useState, useEffect } from "react"

export function FinalScreen() {
  const { dispatch } = useGame()
  const [chestOpened, setChestOpened] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    // Sequence the animations
    const openChest = setTimeout(() => setChestOpened(true), 1000)
    const showParticlesTimer = setTimeout(() => setShowParticles(true), 1500)
    const showMessageTimer = setTimeout(() => setShowMessage(true), 2500)

    return () => {
      clearTimeout(openChest)
      clearTimeout(showParticlesTimer)
      clearTimeout(showMessageTimer)
    }
  }, [])

  const handleRestart = () => {
    dispatch({ type: "RESET_GAME" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with wine red gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#390007] via-[#4a0009] to-[#2d0005]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(215, 196, 158, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(215, 196, 158, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-bounce opacity-80"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        {/* Treasure chest animation */}
        <div className="mb-12 animate-fade-in">
          <div className="relative inline-block">
            {/* Chest base */}
            <div
              className={`
                w-32 h-20 mx-auto mb-4 rounded-lg relative
                bg-gradient-to-b from-amber-600 to-amber-800
                border-4 border-amber-700
                shadow-2xl
                transition-all duration-1000
                ${chestOpened ? "shadow-accent/50" : ""}
              `}
            >
              {/* Chest lid */}
              <div
                className={`
                  absolute -top-4 left-0 right-0
                  w-32 h-16 rounded-t-lg
                  bg-gradient-to-b from-amber-500 to-amber-700
                  border-4 border-amber-700 border-b-0
                  transition-all duration-1000 ease-out
                  origin-bottom
                  ${chestOpened ? "-rotate-45 -translate-y-8" : ""}
                `}
              >
                {/* Chest lock */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-accent rounded-full border-2 border-amber-800" />
                </div>
              </div>

              {/* Golden glow when opened */}
              {chestOpened && <div className="absolute inset-0 bg-accent/30 rounded-lg animate-pulse" />}

              {/* Light rays */}
              {chestOpened && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-16 bg-gradient-to-t from-accent to-transparent animate-pulse" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45 w-1 h-12 bg-gradient-to-t from-accent/70 to-transparent animate-pulse delay-300" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-45 w-1 h-12 bg-gradient-to-t from-accent/70 to-transparent animate-pulse delay-500" />
                </div>
              )}
            </div>

            {/* Crown above chest when opened */}
            {chestOpened && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-bounce">
                <Crown className="w-12 h-12 text-accent" />
              </div>
            )}
          </div>
        </div>

        {/* Victory message */}
        {showMessage && (
          <div className="animate-slide-up">
            <div className="mb-8">
              <h1 className="luxury-title text-accent mb-4">¡FELICITACIONES!</h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-accent" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Has Completado el Escape Room</h2>
                <Trophy className="w-8 h-8 text-accent" />
              </div>
            </div>

            {/* Personalized message */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-accent/20">
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-accent mb-3">Mensaje del Tesoro:</h3>
                  <p className="text-white/90 leading-relaxed text-lg">
                    Has demostrado una mente brillante y una determinación excepcional. Tu capacidad para resolver
                    enigmas y superar desafíos te convierte en un verdadero maestro del escape room. Este tesoro es tuyo
                    por derecho propio:
                    <span className="text-accent font-semibold">
                      {" "}
                      el conocimiento y la satisfacción de haber conquistado todos los niveles
                    </span>
                    .
                  </p>
                  <p className="text-accent/80 mt-4 italic">"La verdadera riqueza está en el viaje del aprendizaje."</p>
                </div>
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-accent/10">
                <div className="text-3xl font-bold text-accent mb-1">6</div>
                <div className="text-white/70 text-sm">Niveles Completados</div>
              </div>
              <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-accent/10">
                <div className="text-3xl font-bold text-accent mb-1">100%</div>
                <div className="text-white/70 text-sm">Progreso Total</div>
              </div>
              <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-accent/10">
                <div className="text-3xl font-bold text-accent mb-1">🏆</div>
                <div className="text-white/70 text-sm">Maestro del Escape</div>
              </div>
            </div>

            {/* Restart button */}
            <Button
              onClick={handleRestart}
              size="lg"
              className="
                group relative overflow-hidden
                bg-accent hover:bg-accent/90 
                text-accent-foreground font-bold
                px-12 py-6 text-xl
                border-2 border-accent/20
                shadow-2xl shadow-accent/30
                transition-all duration-300
                hover:scale-105 hover:shadow-accent/40
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <div className="relative flex items-center gap-3">
                <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                <span className="tracking-wide">JUGAR DE NUEVO</span>
              </div>
            </Button>
          </div>
        )}

        {/* Decorative elements */}
        {showMessage && (
          <div className="mt-16 flex justify-center items-center gap-8 opacity-60 animate-fade-in delay-1000">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="text-accent text-sm font-medium tracking-widest">VICTORIA TOTAL</div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
        )}
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </div>
  )
}
