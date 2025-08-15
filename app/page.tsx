"use client";

import { useGame } from "@/contexts/GameContext";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LevelIntroScreen } from "@/components/LevelIntroScreen";
import { GameScreen } from "@/components/GameScreen";
import { FinalScreen } from "@/components/FinalScreen";

export default function Home() {
  const { state } = useGame();

  switch (state.activeScreen) {
    case "welcome":
      return <WelcomeScreen />;
    case "level-intro":
      return <LevelIntroScreen />;
    case "questions":
      return <GameScreen />;
    case "final":
      return <FinalScreen />;
  }
}
