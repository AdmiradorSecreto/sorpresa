"use client";
import { useGame } from "../context/GameContext";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

export function WelcomeScreen() {
  const { dispatch } = useGame();
  
  // Lista de imágenes - sin /sorpresa/ porque ya está en basePath
  const images = [
    '/1.JPG',
    '/2.JPG', 
    '/3.JPG',
    '/4.JPG',
    '/5.JPG',
    '/6.JPG',
    '/7.JPG',
    '/8.JPG',
    '/9.JPG',
    '/10.JPG',
    '/11.JPG'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500); // Duración de la transición
      
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Slideshow de imágenes de fondo */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: '60%',
              filter: 'blur(6px)',
              transform: `scale(1.1) ${index === currentImageIndex ? 'translateX(0)' : 'translateX(20px)'}`,
            }}
          />
        ))}
      </div>

      {/* Overlay animado que cambia de intensidad */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isTransitioning ? 'opacity-90' : 'opacity-80'
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(57, 0, 7, 0.8) 0%, rgba(90, 0, 9, 0.8) 100%)",
        }}
      />

      {/* Indicadores de slideshow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-yellow-400 w-8' 
                : 'bg-white opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-yellow-400 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-yellow-400 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-yellow-400 animate-pulse delay-2000"></div>
      </div>

      {/* Efecto de partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-1000 opacity-75"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-2000 opacity-75"></div>
      </div>

      <div className="text-center z-10 animate-fade-in relative">
        <h1 className="text-6xl font-bold text-white mb-4 animate-slide-down drop-shadow-2xl">
          Escape Room
        </h1>
        <p className="text-xl text-gray-200 mb-12 animate-slide-up drop-shadow-lg">
          ¿No te esperabas esto? <br /> Espero que lo disfrutes y sobre todo te haga ilusión jeje payasa
        </p>

        <button
          onClick={() => dispatch({ type: "START_GAME" })}
          className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold text-xl rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/25 hover:rotate-1"
        >
          <div className="flex items-center gap-3">
            <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            Comenzar
          </div>
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Efecto de brillo en el botón */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-pulse"></div>
        </button>
      </div>
    </div>
  );
}